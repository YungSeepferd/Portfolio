import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const WallCard = ({ title, children, variant="body2", ...props }) => {
  return (
    <Card elevation={3} sx={{ backgroundColor: 'secondary.light', borderRadius: 0 }} {...props}>
      <CardContent>
        {title && (
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        )}
        <Typography variant={variant}>
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WallCard;
