import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, CardActions, Button,
         Grid, useTheme, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * CardGridSection Component
 * 
 * Renders project content as a grid of cards, ideal for:
 * - Feature showcases
 * - Benefit lists
 * - Stakeholder perspectives
 * - Outcome highlights
 * - Tool/technology showcases
 * 
 * Uses MUI Card and Grid2 components with responsive layouts.
 */
const CardGridSection = ({ 
  id,
  title, 
  items = [], 
  columns = { xs: 1, sm: 2, md: 3 },
  content,
  cardVariant = 'elevation',
  elevation = 2
}) => {
  const theme = useTheme();

  if (!items || items.length === 0) {
    return null;
  }

  // Animation variants for staggered card appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box 
      id={id}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{ 
        mb: 8,
        scrollMarginTop: theme.spacing(10)
      }}
    >
      {/* Section Title */}
      {title && (
        <Typography 
          variant="h4" 
          component="h3"
          sx={{ 
            mb: 4,
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.text.primary
          }}
        >
          {title}
        </Typography>
      )}

      {/* Optional introductory content */}
      {content && (
        <Box sx={{ mb: 4 }}>
          {typeof content === 'string' ? (
            <Typography variant="body1" paragraph>
              {content}
            </Typography>
          ) : (
            content
          )}
        </Box>
      )}

      {/* Card Grid */}
      <Grid 
        container 
        spacing={3}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, index) => (
          <Grid 
            key={item.id || index}
            size={{ xs: columns.xs || 12, sm: columns.sm || 6, md: columns.md || 4, lg: columns.lg || columns.md || 4 }}
            component={motion.div}
            variants={cardVariants}
          >
            <Card 
              elevation={cardVariant === 'elevation' ? elevation : 0}
              variant={cardVariant === 'outlined' ? 'outlined' : 'elevation'}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8]
                }
              }}
            >
              {/* Card Media (image or icon) */}
              {item.image && (
                <CardMedia
                  component="img"
                  height={item.imageHeight || 200}
                  image={item.image}
                  alt={item.imageAlt || item.title || 'Card image'}
                  sx={{
                    objectFit: item.imageFit || 'cover'
                  }}
                />
              )}

              {/* Icon/Avatar at top */}
              {item.icon && !item.image && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    pt: 3,
                    pb: 2
                  }}
                >
                  {typeof item.icon === 'string' ? (
                    <Avatar 
                      sx={{ 
                        width: 64, 
                        height: 64,
                        bgcolor: item.color || theme.palette.primary.main
                      }}
                    >
                      {item.icon}
                    </Avatar>
                  ) : (
                    item.icon
                  )}
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                {/* Card Title */}
                <Typography 
                  variant="h6" 
                  component="h4"
                  gutterBottom
                  sx={{
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.text.primary
                  }}
                >
                  {item.title}
                </Typography>

                {/* Card Subtitle */}
                {item.subtitle && (
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.subtitle}
                  </Typography>
                )}

                {/* Card Description */}
                {item.description && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    paragraph
                  >
                    {item.description}
                  </Typography>
                )}

                {/* Benefits/Features List */}
                {item.benefits && Array.isArray(item.benefits) && item.benefits.length > 0 && (
                  <Box component="ul" sx={{ pl: 2, mt: 2, mb: 0 }}>
                    {item.benefits.map((benefit, idx) => (
                      <Typography 
                        key={idx}
                        component="li" 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        {benefit}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* Features List (alternative) */}
                {item.features && Array.isArray(item.features) && item.features.length > 0 && (
                  <Box component="ul" sx={{ pl: 2, mt: 2, mb: 0 }}>
                    {item.features.map((feature, idx) => (
                      <Typography 
                        key={idx}
                        component="li" 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* Tags/Chips */}
                {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {item.tags.map((tag, idx) => (
                      <Chip 
                        key={idx}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              </CardContent>

              {/* Card Actions */}
              {item.action && (
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    size="small" 
                    color="primary"
                    href={item.action.url}
                    target={item.action.external ? '_blank' : undefined}
                    rel={item.action.external ? 'noopener noreferrer' : undefined}
                  >
                    {item.action.label || 'Learn More'}
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardGridSection;
