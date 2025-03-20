import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { wallsData } from './Walls';
import musicMoritz from '../assets/css/images/MusicMoritz.jpg';
import skillsImg from '../assets/css/images/HackathonBG.jpg';
import motivationsImg from '../assets/css/images/Salzburg.jpg';
import visionImg from '../assets/css/images/VRBrille.JPG';
import './ParallaxScroll.css';

// Filtering out "Vision" slide and merging its content with "Motivations"
const useFilteredWalls = () => {
	return useMemo(() => {
		const filtered = wallsData.filter(slide => slide.title !== 'Vision');
		const visionSlide = wallsData.find(slide => slide.title === 'Vision');
		if (visionSlide) {
			const idx = filtered.findIndex(slide => slide.title === 'Motivations');
			if (idx !== -1) {
				filtered[idx] = {
					...filtered[idx],
					// Combine content of "Motivations" and "Vision"
					content: filtered[idx].content + " " + visionSlide.content
				};
			}
		}
		return filtered;
	}, []);
};

const smoothScrollTo = (target, duration) => {
	// Linear easing function for smooth snapping
	const start = window.pageYOffset;
	const change = target - start;
	const startTime = performance.now();
	const linearEase = t => t;
	const animateScroll = currentTime => {
		const elapsed = currentTime - startTime;
		const t = Math.min(elapsed / duration, 1);
		window.scrollTo(0, start + change * linearEase(t));
		if (t < 1) {
			requestAnimationFrame(animateScroll);
		}
	};
	requestAnimationFrame(animateScroll);
};

const ParallaxScroll = () => {
	// Use filtered walls data (without Vision)
	const filteredWalls = useFilteredWalls();
	const numSlides = filteredWalls.length;

	const [offset, setOffset] = useState(0);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isLocked, setIsLocked] = useState(false);
	const lastScrollRef = useRef(0);
	const lastImpulseRef = useRef(0);
	const impulseThreshold = 10;      

	const vh = window.innerHeight;
	const vw = window.innerWidth;
	const pauseThreshold = 2.7 * vh;
	// Change multiplier from 1 to 0.7 to minimize scrolling time before footercontact appears.
	const availableVerticalScroll = ((numSlides * vh) - pauseThreshold) * 7;
	const maxOffset = pauseThreshold + availableVerticalScroll;
	const horizontalScrollFactor = 1;
	const perSlide = availableVerticalScroll / (numSlides - 1);
  
	// Continuously computed slide before snapping
	const dynamicSlide = offset < pauseThreshold ? 0 : Math.min((offset - pauseThreshold) / perSlide, numSlides - 1);
	const finalSlide = isLocked ? currentSlide : dynamicSlide;
  
	useEffect(() => {
		let snapTimeout;
		const handleScroll = () => {
			const scrollY = window.pageYOffset;
			// Minimal change protection
			if (Math.abs(scrollY - lastScrollRef.current) < 5) return;
      
			// Clamp to pauseThreshold at the top
			if (scrollY < pauseThreshold) {
				setOffset(pauseThreshold);
				setCurrentSlide(0);
				lastScrollRef.current = pauseThreshold;
				lastImpulseRef.current = pauseThreshold;
				return;
			}
			if (scrollY > maxOffset) {
				setOffset(scrollY);
				return;
			}
			setOffset(scrollY);
      
			// Fallback: debounce snapping if user stops scrolling
			if (snapTimeout) clearTimeout(snapTimeout);
			snapTimeout = setTimeout(() => {
				const effectiveOffset = Math.max(scrollY, pauseThreshold);
				const rawSlide = (effectiveOffset - pauseThreshold) / perSlide;
				 // Increase threshold to 0.35 for a smoother transition between slides.
				let targetSlide = currentSlide;
				if (rawSlide - currentSlide > 0.20) {
					targetSlide = Math.min(numSlides - 1, currentSlide + 1);
				} else if (currentSlide - rawSlide > 0.20) {
					targetSlide = Math.max(0, currentSlide - 1);
				}
				const targetOffset = pauseThreshold + targetSlide * perSlide;
				setIsLocked(true);
				setCurrentSlide(targetSlide);
				// Reduce snapping duration from 50ms to 30ms.
				smoothScrollTo(targetOffset, 30);
				lastScrollRef.current = targetOffset;
				lastImpulseRef.current = targetOffset;
				// Reduced lock duration to 30ms.
				setTimeout(() => setIsLocked(false), 30);
			}, 20); // reduced debounce delay from 50ms to 20ms
      
			lastScrollRef.current = scrollY;
		};
      
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (snapTimeout) clearTimeout(snapTimeout);
		};
	}, [pauseThreshold, perSlide, numSlides, maxOffset, currentSlide]);
  
	return (
		<motion.div
			className="parallax-scroll-container"
			animate={{ x: -finalSlide * vw * horizontalScrollFactor }}
			// Increase container transition duration slightly to 0.03 for smoother tweening.
			transition={{ type: "tween", duration: 0.03, ease: "linear" }}
		>
			{filteredWalls.map((slide, index) => (
				<motion.div
					key={index}
					className="parallax-slide"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={
						currentSlide === index
							? { opacity: 1, scale: isLocked ? 1.02 : 1 }
							: { opacity: 0.5, scale: 0.9 }
					}
					transition={{ duration: 0.2, ease: "easeInOut" }}
				>
					<div className="slide-left">
						{ slide.title === "Motivations" ? (
							<>
								<img className="frame-image" src={motivationsImg} alt="Motivations" />
								<img className="frame-image" src={visionImg} alt="Vision" />
							</>
						) : (
							<img className="frame-image" src={slide.title === 'Interests' ? musicMoritz : slide.title === 'Skills' ? skillsImg : getImageForSlide(slide.title)} alt={slide.title} />
						)}
					</div>
					<div className="slide-right">
						<Typography variant="h2">{slide.title}</Typography>
						<div className="section">
							<Typography variant="h4">Overview</Typography>
							<div>{slide.content}</div>
						</div>
						<div className="section">
							<Typography variant="h4">Details</Typography>
							<div>{slide.content ? 'Additional details about ' + slide.title : 'No details available.'}</div>
						</div>
					</div>
				</motion.div>
			))}
		</motion.div>
	);
};

const getImageForSlide = (title) => {
	// For Motivations, images are handled separately so fallback to relevant images
	if (title === 'Interests') return musicMoritz;
	if (title === 'Skills') return skillsImg;
	if (title === 'Motivations') return motivationsImg;
	return '';
};

export default ParallaxScroll;