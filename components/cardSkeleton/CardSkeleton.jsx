import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function CardSkeleton() {
  return (
    <Stack sx={{padding:"0px", width:"100%", height:"100%", display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:"center"}} spacing={0.5} >
      {/* For variant="text", adjust the height via font-size */}
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" width={'100%'} height={100} />
      <Skeleton variant="rectangular" width={'90%'} height={90} />
      <Skeleton variant="rounded" width={'90%'} height={40} />
      <Skeleton variant="rounded" width={'90%'} height={40} />
      <Skeleton variant="rounded" width={'90%'} height={40} />
    </Stack>
  );
}