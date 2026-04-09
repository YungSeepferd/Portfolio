import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';

/**
 * Background3D Component
 * 
 * Creates an animated background effect for the home section.
 * Uses useTheme hook to safely access theme values with fallbacks.
 */
// MARK FOR DELETION: Duplicate background implementation
const Background3D = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Safely get colors from theme with fallbacks if theme is undefined
    const backgroundColor = theme?.palette?.background?.default || '#f5f5f5';
    const primaryColor = theme?.palette?.primary?.main || '#1976d2';
    const secondaryColor = theme?.palette?.secondary?.main || '#9c27b0';
    
    // Check for dark mode with fallback
    const isDarkMode = theme?.palette?.mode === 'dark';
    
    let particlesArray = [];
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particlesArray = [];
      const numberOfParticles = Math.min(50, Math.floor(window.innerWidth / 30));
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const directionX = Math.random() * 2 - 1;
        const directionY = Math.random() * 2 - 1;
        const color = Math.random() > 0.5 ? primaryColor : secondaryColor;
        
        particlesArray.push({
          x, y, directionX, directionY, size, color,
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
        
        // Move particles
        particle.x += particle.directionX;
        particle.y += particle.directionY;
        
        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.directionX *= -1;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.directionY *= -1;
        }
      });
    };
    
    const connectParticles = () => {
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode ? 
              'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
            ctx.globalAlpha = 0.2 - (distance / 1000);
            ctx.lineWidth = 1;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      drawParticles();
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Set background color
    canvas.style.backgroundColor = backgroundColor;
    
    // Initialize and start animation
    resizeCanvas();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default Background3D;
