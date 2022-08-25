import React from 'react';
import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-eva/radio-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// ----------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width: theme.spacing(25),
  height: theme.spacing(27),
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 672;

export default function AppItemOrders({ patData }) {
  // const [PATData, setData1] = useState();
  // useEffect(() => {
  //   axios
  //     .get('https://pms-mobitel.herokuapp.com/vendorProjectsDatabases')
  //     .then((res) => {
  //       setData1(res.data.PatDataForFrontEnd);
  //       // console.log(res.data.HandOverDataToSquares);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // const TOTAL = PATData;

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={windowsFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{patData}</Typography>
      <Typography variant="subtitle1" sx={{ opacity: 1 }}>
        PAT Pass
      </Typography>
    </RootStyle>
  );
}
