import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Grid, Button, Stack, Typography, Chip } from '@mui/material';
import ExcellTemplate from '../../../../_mocks_/SampleExcellTemplate.xlsx';
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable global-require */
/* eslint-disable valid-typeof */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 10,
    fontWeight: 0.5,
    backgroundColor: '#000000',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    fontWeight: 0.4,
    color: theme.palette.common.white
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#161747'
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#161747'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const Input = styled('input')({
  display: 'none'
});

function UploadExcellData() {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [items, setItems] = useState([]);
  const [file, setFile] = useState([]);

  const [validationErrorMessage, setvalidationErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validationError, setvalidationError] = useState('');
  const [dateValidationError, setDateValidationError] = useState('');
  const [tablecelColor, settablecelColor] = useState('#ffffff');

  const [mobilizationStatusError, setMobilizationStatusError] = useState('');
  const [installationStatusError, setInstallationStatusError] = useState('');
  const [commissioningStatusError, setCommissioningStatusError] = useState('');
  const [sarStatusError, setSARStatusError] = useState('');
  const [patStatusError, setPATStatusError] = useState('');
  const [onAirStatusError, setOnAirStatusError] = useState('');

  const changeFileHandler = () => {
    setItems([]);
  };

  const errorHandler = () => {
    for (let i = 0; i < items.length; i += 1) {
      if (
        !items[i].Implementation_By ||
        !items[i].Project ||
        !items[i].Scope ||
        !items[i].HO_Date ||
        !items[i].Site_ID ||
        !items[i].Site_Name ||
        !items[i].New_RAT ||
        !items[i].Site_Engineer ||
        !items[i].Sub_Contractor ||
        !items[i].Site_Status ||
        !items[i].Responsible
      ) {
        setvalidationError('Validation Error!');
        // console.log(validationError);
        setvalidationErrorMessage(
          'Please fill all the mandatorily required fields before submit !'
        );
        settablecelColor('#FF0000');
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 10000);
      } else if (!validationError) {
        // console.log('No validation err!');
      }
    }
  };

  const dateFormatter = () => {
    // Date validation for handover date.
    for (let i = 0; i < items.length; i += 1) {
      // ------------------------- Implementation_By -------------------------------
      if (items[i].Implementation_By) {
        if (items[i].Implementation_By === 'Huawei' || items[i].Implementation_By === 'ZTE') {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          items[i].Implementation_By !== 'Huawei' ||
          items[i].Implementation_By !== 'ZTE'
        ) {
          setDateValidationError('Implementation_By format error !');
          setvalidationErrorMessage(
            'Invalid Implementation_By input. Please fill with either Huawei or ZTE !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setDateValidationError('Implementation_By is empty !');
        setvalidationErrorMessage(
          'Implementation_By input is empty. Please fill with either Huawei or ZTE !'
        );
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 8000);
      }

      // ------------------------- HO_Date -------------------------------
      if (items[i].HO_Date) {
        if (
          Number.isNaN(Number(items[i].HO_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].HO_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].HO_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].HO_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].HO_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].HO_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].HO_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].HO_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Handover date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Civil_PAT_Date -------------------------------
      if (items[i].Civil_PAT_Date) {
        if (
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Civil_PAT_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Civil_PAT_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Civil PAT date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- SAQ_Clearance_Date -------------------------------
      if (items[i].SAQ_Clearance_Date) {
        if (
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid SAQ_Clearance_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Approval_Received_Date -------------------------------
      if (items[i].Approval_Received_Date) {
        if (
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Approval_Received_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Approval_Received_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Approval_Received_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- MCW_Requested_Date -------------------------------
      if (items[i].MCW_Requested_Date) {
        if (
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].MCW_Requested_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].MCW_Requested_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid MCW_Requested_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- MCW_Completed_Date -------------------------------
      if (items[i].MCW_Completed_Date) {
        if (
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].MCW_Completed_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].MCW_Completed_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid MCW_Completed_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Mobilized_Date -------------------------------
      if (items[i].Mobilized_Date) {
        if (
          Number.isNaN(Number(items[i].Mobilized_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Mobilized_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Mobilized_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Mobilized_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Mobilized_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Mobilized_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Mobilized_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Mobilized_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Mobilized_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Installation_Date -------------------------------
      if (items[i].Installation_Date) {
        if (
          Number.isNaN(Number(items[i].Installation_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Installation_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Installation_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Installation_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Installation_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Installation_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Installation_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Installation_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Installation_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Power_Connected_Date -------------------------------
      if (items[i].Power_Connected_Date) {
        if (
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Power_Connected_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Power_Connected_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Power_Connected_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- TX_Connected_Date -------------------------------
      if (items[i].TX_Connected_Date) {
        if (
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].TX_Connected_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].TX_Connected_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid TX_Connected_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Commisioned_Date -------------------------------
      if (items[i].Commisioned_Date) {
        if (
          Number.isNaN(Number(items[i].Commisioned_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Commisioned_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Commisioned_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Commisioned_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Commisioned_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Commisioned_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Commisioned_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Commisioned_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Commisioned_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- SAR_Date -------------------------------
      if (items[i].SAR_Date) {
        if (
          Number.isNaN(Number(items[i].SAR_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].SAR_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].SAR_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].SAR_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].SAR_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].SAR_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].SAR_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].SAR_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid SAR_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PAT_Pass_Date -------------------------------
      if (items[i].PAT_Pass_Date) {
        if (
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PAT_Pass_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PAT_Pass_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PAT_Pass_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Check_List_Submitted -------------------------------
      if (items[i].Check_List_Submitted) {
        if (
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Check_List_Submitted.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Check_List_Submitted.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Check_List_Submitted date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Check_List_Verified -------------------------------
      if (items[i].Check_List_Verified) {
        if (
          Number.isNaN(Number(items[i].Check_List_Verified.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Check_List_Verified.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Check_List_Verified.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Check_List_Verified.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Check_List_Verified.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Check_List_Verified.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Check_List_Verified.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Check_List_Verified.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Check_List_Verified date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- On_Air_Target -------------------------------
      if (items[i].On_Air_Target) {
        if (
          Number.isNaN(Number(items[i].On_Air_Target.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].On_Air_Target.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].On_Air_Target.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].On_Air_Target.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].On_Air_Target.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].On_Air_Target.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].On_Air_Target.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].On_Air_Target.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid On_Air_Target date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- On_Air_Date -------------------------------
      if (items[i].On_Air_Date) {
        if (
          Number.isNaN(Number(items[i].On_Air_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].On_Air_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].On_Air_Date.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].On_Air_Date.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].On_Air_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].On_Air_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].On_Air_Date.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].On_Air_Date.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid On_Air_Date date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PR_Submitted_for_TSS -------------------------------
      if (items[i].PR_Submitted_for_TSS) {
        if (
          Number.isNaN(Number(items[i].PR_Submitted_for_TSS.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PR_Submitted_for_TSS.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PR_Submitted_for_TSS.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Submitted_for_TSS.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PR_Submitted_for_TSS.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PR_Submitted_for_TSS.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PR_Submitted_for_TSS.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Submitted_for_TSS.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PR_Submitted_for_TSS date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PR_Raised_for_TSS -------------------------------
      if (items[i].PR_Raised_for_TSS) {
        if (
          Number.isNaN(Number(items[i].PR_Raised_for_TSS.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PR_Raised_for_TSS.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PR_Raised_for_TSS.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Raised_for_TSS.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PR_Raised_for_TSS.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PR_Raised_for_TSS.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PR_Raised_for_TSS.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Raised_for_TSS.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PR_Raised_for_TSS date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PO_Issued_for_TSS -------------------------------
      if (items[i].PO_Issued_for_TSS) {
        if (
          Number.isNaN(Number(items[i].PO_Issued_for_TSS.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PO_Issued_for_TSS.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PO_Issued_for_TSS.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PO_Issued_for_TSS.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PO_Issued_for_TSS.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PO_Issued_for_TSS.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PO_Issued_for_TSS.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PO_Issued_for_TSS.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PO_Issued_for_TSS date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- TSSR_Submitted -------------------------------
      if (items[i].TSSR_Submitted) {
        if (
          Number.isNaN(Number(items[i].TSSR_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].TSSR_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].TSSR_Submitted.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].TSSR_Submitted.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].TSSR_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].TSSR_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].TSSR_Submitted.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].TSSR_Submitted.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid TSSR_Submitted date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- TSSR_Approved -------------------------------
      if (items[i].TSSR_Approved) {
        if (
          Number.isNaN(Number(items[i].TSSR_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].TSSR_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].TSSR_Approved.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].TSSR_Approved.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].TSSR_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].TSSR_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].TSSR_Approved.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].TSSR_Approved.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid TSSR_Approved date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- BOQ_Submitted -------------------------------
      if (items[i].BOQ_Submitted) {
        if (
          Number.isNaN(Number(items[i].BOQ_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].BOQ_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].BOQ_Submitted.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].BOQ_Submitted.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].BOQ_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].BOQ_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].BOQ_Submitted.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].BOQ_Submitted.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid BOQ_Submitted date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Imp_HO -------------------------------
      if (items[i].Imp_HO) {
        if (
          Number.isNaN(Number(items[i].Imp_HO.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Imp_HO.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Imp_HO.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Imp_HO.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Imp_HO.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Imp_HO.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Imp_HO.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Imp_HO.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Imp_HO date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PR_Submission_for_Imp -------------------------------
      if (items[i].PR_Submission_for_Imp) {
        if (
          Number.isNaN(Number(items[i].PR_Submission_for_Imp.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PR_Submission_for_Imp.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PR_Submission_for_Imp.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Submission_for_Imp.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PR_Submission_for_Imp.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PR_Submission_for_Imp.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PR_Submission_for_Imp.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Submission_for_Imp.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PR_Submission_for_Imp date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PR_Raised_for_Imp -------------------------------
      if (items[i].PR_Raised_for_Imp) {
        if (
          Number.isNaN(Number(items[i].PR_Raised_for_Imp.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PR_Raised_for_Imp.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PR_Raised_for_Imp.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Raised_for_Imp.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PR_Raised_for_Imp.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PR_Raised_for_Imp.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PR_Raised_for_Imp.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Raised_for_Imp.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PR_Raised_for_Imp date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PO_Issued_for_Imp -------------------------------
      if (items[i].PO_Issued_for_Imp) {
        if (
          Number.isNaN(Number(items[i].PO_Issued_for_Imp.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PO_Issued_for_Imp.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PO_Issued_for_Imp.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PO_Issued_for_Imp.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PO_Issued_for_Imp.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PO_Issued_for_Imp.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PO_Issued_for_Imp.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PO_Issued_for_Imp.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PO_Issued_for_Imp date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PR_Sub_for_supply -------------------------------
      if (items[i].PR_Sub_for_supply) {
        if (
          Number.isNaN(Number(items[i].PR_Sub_for_supply.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PR_Sub_for_supply.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PR_Sub_for_supply.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Sub_for_supply.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PR_Sub_for_supply.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PR_Sub_for_supply.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PR_Sub_for_supply.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Sub_for_supply.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PR_Sub_for_supply date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PR_Raised_for_supply -------------------------------
      if (items[i].PR_Raised_for_supply) {
        if (
          Number.isNaN(Number(items[i].PR_Raised_for_supply.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PR_Raised_for_supply.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PR_Raised_for_supply.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Raised_for_supply.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PR_Raised_for_supply.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PR_Raised_for_supply.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PR_Raised_for_supply.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PR_Raised_for_supply.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PR_Raised_for_supply date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PO_Issued_for_supply -------------------------------
      if (items[i].PO_Issued_for_supply) {
        if (
          Number.isNaN(Number(items[i].PO_Issued_for_supply.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PO_Issued_for_supply.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PO_Issued_for_supply.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PO_Issued_for_supply.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PO_Issued_for_supply.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PO_Issued_for_supply.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PO_Issued_for_supply.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PO_Issued_for_supply.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PO_Issued_for_supply date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PI_Submitted -------------------------------
      if (items[i].PI_Submitted) {
        if (
          Number.isNaN(Number(items[i].PI_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PI_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PI_Submitted.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PI_Submitted.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PI_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PI_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PI_Submitted.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PI_Submitted.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PI_Submitted date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PI_Approved -------------------------------
      if (items[i].PI_Approved) {
        if (
          Number.isNaN(Number(items[i].PI_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PI_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PI_Approved.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].PI_Approved.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PI_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PI_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PI_Approved.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].PI_Approved.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PI_Approved date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- TRC_Completed -------------------------------
      if (items[i].TRC_Completed) {
        if (
          Number.isNaN(Number(items[i].TRC_Completed.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].TRC_Completed.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].TRC_Completed.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].TRC_Completed.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].TRC_Completed.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].TRC_Completed.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].TRC_Completed.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].TRC_Completed.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid TRC_Completed date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- BOI_Completed -------------------------------
      if (items[i].BOI_Completed) {
        if (
          Number.isNaN(Number(items[i].BOI_Completed.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].BOI_Completed.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].BOI_Completed.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].BOI_Completed.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].BOI_Completed.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].BOI_Completed.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].BOI_Completed.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].BOI_Completed.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid BOI_Completed date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- ICL_Completed -------------------------------
      if (items[i].ICL_Completed) {
        if (
          Number.isNaN(Number(items[i].ICL_Completed.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].ICL_Completed.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].ICL_Completed.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].ICL_Completed.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].ICL_Completed.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].ICL_Completed.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].ICL_Completed.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].ICL_Completed.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid ICL_Completed date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- LC_Issued -------------------------------
      if (items[i].LC_Issued) {
        if (
          Number.isNaN(Number(items[i].LC_Issued.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].LC_Issued.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].LC_Issued.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].LC_Issued.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].LC_Issued.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].LC_Issued.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].LC_Issued.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].LC_Issued.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid LC_Issued date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Shipped -------------------------------
      if (items[i].Shipped) {
        if (
          Number.isNaN(Number(items[i].Shipped.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Shipped.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Shipped.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Shipped.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Shipped.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Shipped.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Shipped.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Shipped.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Shipped date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Received_at_port -------------------------------
      if (items[i].Received_at_port) {
        if (
          Number.isNaN(Number(items[i].Received_at_port.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Received_at_port.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Received_at_port.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Received_at_port.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Received_at_port.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Received_at_port.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Received_at_port.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Received_at_port.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Received_at_port date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Delivered_to_WH -------------------------------
      if (items[i].Delivered_to_WH) {
        if (
          Number.isNaN(Number(items[i].Delivered_to_WH.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Delivered_to_WH.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Delivered_to_WH.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Delivered_to_WH.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Delivered_to_WH.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Delivered_to_WH.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Delivered_to_WH.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Delivered_to_WH.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Delivered_to_WH date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Reconciled -------------------------------
      if (items[i].Reconciled) {
        if (
          Number.isNaN(Number(items[i].Reconciled.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Reconciled.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Reconciled.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Reconciled.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Reconciled.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Reconciled.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Reconciled.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Reconciled.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Reconciled date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- COW_Submitted -------------------------------
      if (items[i].COW_Submitted) {
        if (
          Number.isNaN(Number(items[i].COW_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].COW_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].COW_Submitted.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].COW_Submitted.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].COW_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].COW_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].COW_Submitted.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].COW_Submitted.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid COW_Submitted date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- COW_Approved -------------------------------
      if (items[i].COW_Approved) {
        if (
          Number.isNaN(Number(items[i].COW_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].COW_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].COW_Approved.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].COW_Approved.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].COW_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].COW_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].COW_Approved.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].COW_Approved.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid COW_Approved date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Supply_HW_PAC_Submitted -------------------------------
      if (items[i].Supply_HW_PAC_Submitted) {
        if (
          Number.isNaN(Number(items[i].Supply_HW_PAC_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Supply_HW_PAC_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Supply_HW_PAC_Submitted.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Supply_HW_PAC_Submitted.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Supply_HW_PAC_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Supply_HW_PAC_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Supply_HW_PAC_Submitted.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Supply_HW_PAC_Submitted.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Supply_HW_PAC_Submitted date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Supply_HW_PAC_Approved -------------------------------
      if (items[i].Supply_HW_PAC_Approved) {
        if (
          Number.isNaN(Number(items[i].Supply_HW_PAC_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Supply_HW_PAC_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Supply_HW_PAC_Approved.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Supply_HW_PAC_Approved.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Supply_HW_PAC_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Supply_HW_PAC_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Supply_HW_PAC_Approved.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Supply_HW_PAC_Approved.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Supply_HW_PAC_Approved date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Imp_PAC_Submitted -------------------------------
      if (items[i].Imp_PAC_Submitted) {
        if (
          Number.isNaN(Number(items[i].Imp_PAC_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Imp_PAC_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Imp_PAC_Submitted.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Imp_PAC_Submitted.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Imp_PAC_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Imp_PAC_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Imp_PAC_Submitted.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Imp_PAC_Submitted.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Imp_PAC_Submitted date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Imp_PAC_Approved -------------------------------
      if (items[i].Imp_PAC_Approved) {
        if (
          Number.isNaN(Number(items[i].Imp_PAC_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Imp_PAC_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Imp_PAC_Approved.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Imp_PAC_Approved.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Imp_PAC_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Imp_PAC_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Imp_PAC_Approved.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Imp_PAC_Approved.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Imp_PAC_Approved date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Supply_SW_PAC_Submitted -------------------------------
      if (items[i].Supply_SW_PAC_Submitted) {
        if (
          Number.isNaN(Number(items[i].Supply_SW_PAC_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Supply_SW_PAC_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Supply_SW_PAC_Submitted.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Supply_SW_PAC_Submitted.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Supply_SW_PAC_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Supply_SW_PAC_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Supply_SW_PAC_Submitted.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Supply_SW_PAC_Submitted.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Supply_SW_PAC_Submitted date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Supply_SW_PAC_Approved -------------------------------
      if (items[i].Supply_SW_PAC_Approved) {
        if (
          Number.isNaN(Number(items[i].Supply_SW_PAC_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Supply_SW_PAC_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Supply_SW_PAC_Approved.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Supply_SW_PAC_Approved.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Supply_SW_PAC_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Supply_SW_PAC_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Supply_SW_PAC_Approved.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Supply_SW_PAC_Approved.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Supply_SW_PAC_Approved date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Capitalization_Supply_HW -------------------------------
      if (items[i].Capitalization_Supply_HW) {
        if (
          Number.isNaN(Number(items[i].Capitalization_Supply_HW.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Capitalization_Supply_HW.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Capitalization_Supply_HW.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Capitalization_Supply_HW.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Capitalization_Supply_HW.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Capitalization_Supply_HW.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Capitalization_Supply_HW.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Capitalization_Supply_HW.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Capitalization_Supply_HW date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Capitalization_Imp -------------------------------
      if (items[i].Capitalization_Imp) {
        if (
          Number.isNaN(Number(items[i].Capitalization_Imp.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Capitalization_Imp.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Capitalization_Imp.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Capitalization_Imp.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Capitalization_Imp.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Capitalization_Imp.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Capitalization_Imp.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Capitalization_Imp.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Capitalization_Imp date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Capitalization_Supply_SW -------------------------------
      if (items[i].Capitalization_Supply_SW) {
        if (
          Number.isNaN(Number(items[i].Capitalization_Supply_SW.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Capitalization_Supply_SW.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Capitalization_Supply_SW.slice(8, 10))) === false
        ) {
          // console.log(Number.isNaN(Number(items[i].Capitalization_Supply_SW.slice(0, 4))));
          // console.log('No Handover Date validation error!');
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Capitalization_Supply_SW.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Capitalization_Supply_SW.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Capitalization_Supply_SW.slice(8, 10))) === true
        ) {
          // console.log(Number.isNaN(Number(items[i].Capitalization_Supply_SW.slice(0, 4))));
          // console.log('Handover Date validation error!');
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Capitalization_Supply_SW date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        // console.log('No Date validation error! Date is empty !');
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Mobilization_Status -------------------------------------
      if (items[i].Mobilization_Status) {
        if (items[i].Mobilization_Status === 'Completed' && items[i].Mobilized_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].Mobilization_Status === 'Completed' && !items[i].Mobilized_Date) {
          setMobilizationStatusError('Mobilization_Status error !');
          setvalidationErrorMessage(
            'Invalid Mobilization_Status format. Please add Mobilization Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Installation_Status -------------------------------------
      if (items[i].Installation_Status) {
        if (items[i].Installation_Status === 'Completed' && items[i].Installation_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].Installation_Status === 'Completed' && !items[i].Installation_Date) {
          setInstallationStatusError('Installation_Status error !');
          setvalidationErrorMessage(
            'Invalid Installation_Status format. Please add Installation Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Commissioning_Status -------------------------------------
      if (items[i].Commissioning_Status) {
        if (items[i].Commissioning_Status === 'Completed' && items[i].Commisioned_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].Commissioning_Status === 'Completed' && !items[i].Commisioned_Date) {
          setCommissioningStatusError('Commissioning_Status error !');
          setvalidationErrorMessage(
            'Invalid Commissioning_Status format. Please add Commisioning Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- SAR_Status -------------------------------------
      if (items[i].SAR_Status) {
        if (items[i].SAR_Status === 'Approved' && items[i].SAR_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].SAR_Status === 'Approved' && !items[i].SAR_Date) {
          setSARStatusError('SAR_Status error !');
          setvalidationErrorMessage('Invalid SAR_Status format. Please add SAR Approved date !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PAT_Status -------------------------------------
      if (items[i].PAT_Status) {
        if (items[i].PAT_Status === 'Pass' && items[i].PAT_Pass_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].PAT_Status === 'Pass' && !items[i].PAT_Pass_Date) {
          setPATStatusError('PAT_Status error !');
          setvalidationErrorMessage('Invalid PAT_Status format. Please add PAT Pass date !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- On_Air_Status -------------------------------------
      if (items[i].On_Air_Status) {
        if (items[i].On_Air_Status === 'Completed' && items[i].On_Air_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].On_Air_Status === 'Completed' && !items[i].On_Air_Date) {
          setOnAirStatusError('On_Air_Status error !');
          setvalidationErrorMessage(
            'Invalid On_Air_Status format. Please add On Air Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }
      // ---------------------------------------------------------------------------
    }
  };

  // paramaeters change with change of items
  useEffect(() => {
    setMobilizationStatusError('');
    setInstallationStatusError('');
    setCommissioningStatusError('');
    setSARStatusError('');
    setPATStatusError('');
    setOnAirStatusError('');
    setvalidationError('');
    settablecelColor('');
    setDateValidationError('');
    setvalidationErrorMessage('');
    setSuccessMessage('');
    errorHandler();
    dateFormatter();
  }, [items]);

  // uploading excell data to the database
  const uplaodHandler = async (e) => {
    e.preventDefault();
    const newPost = items;

    if (validationError) {
      errorHandler();
      setvalidationErrorMessage('Please fill all the mandatorily required fields before submit !');
    } else if (dateValidationError === 'Date format error !') {
      dateFormatter();
      setvalidationErrorMessage(
        'Please change date format of fields with invalid date to yyyy-mm-dd format before submit !'
      );
    } else if (dateValidationError === 'Implementation_By format error !') {
      dateFormatter();
      setvalidationErrorMessage(
        'Please fill Implementation_By field with either Huawei or ZTE before submit !'
      );
    } else if (dateValidationError === 'Implementation_By is empty !') {
      dateFormatter();
      setvalidationErrorMessage(
        'Please fill Implementation_By field with either Huawei or ZTE before submit !'
      );
      // Today validation work
    } else if (mobilizationStatusError) {
      dateFormatter();
      setvalidationErrorMessage('Please fill Mobilized_Date field before submit !');
    } else if (installationStatusError) {
      dateFormatter();
      setvalidationErrorMessage('Please fill Installation_Date field before submit !');
    } else if (commissioningStatusError) {
      dateFormatter();
      setvalidationErrorMessage('Please fill Commisioned_Date field before submit !');
    } else if (sarStatusError) {
      dateFormatter();
      setvalidationErrorMessage('Please fill SAR_Date field before submit !');
    } else if (patStatusError) {
      dateFormatter();
      setvalidationErrorMessage('Please fill PAT_Pass_Date field before submit !');
    } else if (onAirStatusError) {
      dateFormatter();
      setvalidationErrorMessage('Please fill On_Air_Date field before submit !');
    } else {
      axiosInstance
        .post('/vendorProjectsDatabasesExcell/upload', newPost)
        .then((res) => {
          alert(`${res.data.success}`);

          // const confirmBox = window.confirm('Do you want to upload more documents ?');
          // if (confirmBox === true) {
          //   navigate('/dashboard/DatabasesUploadProjectFiles', { replace: true });
          // } else {
          //   navigate('/dashboard/DatabasesVendorProjects', { replace: true });
          // }
        })
        .catch((error) => {
          console.log(error);
          alert(
            'Something went wrong with your conection with the server. Please Check your internet access !'
          );
          // console.log(error.response);
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        });
    }
  };

  // inpit excell reading
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {
          raw: false
        });
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        {items.length > 0 ? (
          <Chip icon={<AttachmentIcon />} label={file.name} color="success" variant="outlined" />
        ) : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          {items.length > 0 ? (
            <Button size="medium" variant="outlined" component="span" onClick={changeFileHandler}>
              Change File
            </Button>
          ) : null}
          {items.length > 0 ? (
            <Button size="small" variant="contained" component="span" onClick={uplaodHandler}>
              Upload file
            </Button>
          ) : (
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                    setFile(file);
                  }}
                />
                <Button size="medium" variant="outlined" component="span">
                  Choose File
                </Button>
              </label>
              <a href={ExcellTemplate} download="SampleExcellTemplate.xlsx">
                Download Sample Excell Sheet
              </a>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        {validationErrorMessage && (
          <Grid item xs={12} sm={6} md={12}>
            <Accordion
              sx={{
                backgroundColor: '#c20202',
                borderRadius: 0.2,
                alignItems: 'center'
              }}
            >
              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant="h8" justifyContent="space-between">
                  <span className="error-message">{validationErrorMessage}</span>
                </Typography>
              </AccordionSummary>
            </Accordion>
          </Grid>
        )}
      </Stack>
      {items.length > 0 ? (
        <TableContainer component={Paper} style={{ maxHeight: '380px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Project_ID</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Implementation_By
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Project_Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Scope&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  HO_Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Site_ID</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Site_Name</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  New_RAT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Site_Engineer</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Sub_Contractor</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Site_Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Responsible&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>Civil_PAT_Date</StyledTableCell>
                <StyledTableCell>SAQ_Clearance_Date</StyledTableCell>
                <StyledTableCell>Approval_Received_Date</StyledTableCell>
                <StyledTableCell>MCW_Requested_Date,</StyledTableCell>
                <StyledTableCell>MCW_Completed_Date,</StyledTableCell>
                <StyledTableCell>Mobilization_Status</StyledTableCell>
                <StyledTableCell>Mobilized_Date</StyledTableCell>
                <StyledTableCell>Installation_Status</StyledTableCell>
                <StyledTableCell>Installation_Date</StyledTableCell>
                <StyledTableCell>Power_Connected_Date</StyledTableCell>
                <StyledTableCell>TX_Connected_Date</StyledTableCell>
                <StyledTableCell>Commissioning_Status</StyledTableCell>
                <StyledTableCell>Commisioned_Date</StyledTableCell>
                <StyledTableCell>SAR_Status</StyledTableCell>
                <StyledTableCell>
                  SAR_Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>PAT_Status</StyledTableCell>
                <StyledTableCell>PAT_Pass_Date</StyledTableCell>
                <StyledTableCell>Check_List_Submitted</StyledTableCell>
                <StyledTableCell>Check_List_Verified</StyledTableCell>
                <StyledTableCell>On_Air_Target</StyledTableCell>
                <StyledTableCell>On_Air_Status</StyledTableCell>
                <StyledTableCell>On_Air_Date</StyledTableCell>
                <StyledTableCell>PR_Submitted_for_TSS</StyledTableCell>
                <StyledTableCell>PR_Raised_for_TSS</StyledTableCell>
                <StyledTableCell>PR_Number_for_TSS</StyledTableCell>
                <StyledTableCell>TSS_PO_number</StyledTableCell>
                <StyledTableCell>PO_Issued_for_TSS</StyledTableCell>
                <StyledTableCell>
                  TSS_HO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>TSSR_Submitted</StyledTableCell>
                <StyledTableCell>TSSR_Approved</StyledTableCell>
                <StyledTableCell>BOQ_Submitted</StyledTableCell>
                <StyledTableCell>
                  Imp_HO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>PR_Submission_for_Imp</StyledTableCell>
                <StyledTableCell>PR_Number_for_Imp</StyledTableCell>
                <StyledTableCell>PR_Raised_for_Imp</StyledTableCell>
                <StyledTableCell>PO_Issued_for_Imp</StyledTableCell>
                <StyledTableCell>PR_Sub_for_supply</StyledTableCell>
                <StyledTableCell>PR_Number_for_supply</StyledTableCell>
                <StyledTableCell>PR_Raised_for_supply</StyledTableCell>
                <StyledTableCell>PO_Issued_for_supply</StyledTableCell>
                <StyledTableCell>PI_Submitted</StyledTableCell>
                <StyledTableCell>
                  PI_Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>PI_Approved</StyledTableCell>
                <StyledTableCell>TRC_Completed</StyledTableCell>
                <StyledTableCell>BOI_Completed</StyledTableCell>
                <StyledTableCell>ICL_Completed</StyledTableCell>
                <StyledTableCell>
                  LC_Issued&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>
                  Shipped&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>Received_at_port</StyledTableCell>
                <StyledTableCell>Delivered_to_WH</StyledTableCell>
                <StyledTableCell>Reconciled</StyledTableCell>
                <StyledTableCell>COW_Submitted</StyledTableCell>
                <StyledTableCell>COW_Approved</StyledTableCell>
                <StyledTableCell>Supply_HW_PAC_Submitted</StyledTableCell>
                <StyledTableCell>Supply_HW_PAC_Approved</StyledTableCell>
                <StyledTableCell>Imp_PAC_Submitted</StyledTableCell>
                <StyledTableCell>Imp_PAC_Approved</StyledTableCell>
                <StyledTableCell>Supply_SW_PAC_Submitted</StyledTableCell>
                <StyledTableCell>Supply_SW_PAC_Approved</StyledTableCell>
                <StyledTableCell>Capitalization_Supply_HW</StyledTableCell>
                <StyledTableCell>Capitalization_Imp</StyledTableCell>
                <StyledTableCell>Capitalization_Supply_SW</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <StyledTableRow key={item.Project_ID}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{item.Project_ID}</StyledTableCell>
                  <StyledTableCell align="left">{item.Implementation_By}</StyledTableCell>
                  <StyledTableCell align="left" style={{ width: '200px' }}>
                    {item.Project}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.Scope}</StyledTableCell>
                  <StyledTableCell align="left">{item.HO_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_ID}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_Name}</StyledTableCell>
                  <StyledTableCell align="left">{item.New_RAT}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_Engineer}</StyledTableCell>
                  <StyledTableCell align="left">{item.Sub_Contractor}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Responsible}</StyledTableCell>
                  <StyledTableCell align="left">{item.Civil_PAT_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.SAQ_Clearance_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Approval_Received_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.MCW_Requested_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.MCW_Completed_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Mobilization_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Mobilized_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Installation_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Installation_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Power_Connected_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.TX_Connected_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Commissioning_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Commisioned_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.SAR_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.SAR_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.PAT_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.PAT_Pass_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Check_List_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.Check_List_Verified}</StyledTableCell>
                  <StyledTableCell align="left">{item.On_Air_Target}</StyledTableCell>
                  <StyledTableCell align="left">{item.On_Air_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.On_Air_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.PR_Submitted_for_TSS}</StyledTableCell>
                  <StyledTableCell align="left">{item.PR_Raised_for_TSS}</StyledTableCell>
                  <StyledTableCell align="left">{item.PR_Number_for_TSS}</StyledTableCell>
                  <StyledTableCell align="left">{item.TSS_PO_number}</StyledTableCell>
                  <StyledTableCell align="left">{item.PO_Issued_for_TSS}</StyledTableCell>
                  <StyledTableCell align="left">{item.TSS_HO}</StyledTableCell>
                  <StyledTableCell align="left">{item.TSSR_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.TSSR_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.BOQ_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.Imp_HO}</StyledTableCell>
                  <StyledTableCell align="left">{item.PR_Submission_for_Imp}</StyledTableCell>
                  <StyledTableCell align="left">{item.PR_Number_for_Imp}</StyledTableCell>
                  <StyledTableCell align="left">{item.PR_Raised_for_Imp}</StyledTableCell>
                  <StyledTableCell align="left">{item.PO_Issued_for_Imp}</StyledTableCell>
                  <StyledTableCell align="left">{item.PR_Sub_for_supply}</StyledTableCell>
                  <StyledTableCell align="left">{item.PR_Number_for_supply}</StyledTableCell>
                  <StyledTableCell align="left">{item.PR_Raised_for_supply}</StyledTableCell>
                  <StyledTableCell align="left">{item.PO_Issued_for_supply}</StyledTableCell>
                  <StyledTableCell align="left">{item.PI_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.PI_Number}</StyledTableCell>
                  <StyledTableCell align="left">{item.PI_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.TRC_Completed}</StyledTableCell>
                  <StyledTableCell align="left">{item.BOI_Completed}</StyledTableCell>
                  <StyledTableCell align="left">{item.ICL_Completed}</StyledTableCell>
                  <StyledTableCell align="left">{item.LC_Issued}</StyledTableCell>
                  <StyledTableCell align="left">{item.Shipped}</StyledTableCell>
                  <StyledTableCell align="left">{item.Received_at_port}</StyledTableCell>
                  <StyledTableCell align="left">{item.Delivered_to_WH}</StyledTableCell>
                  <StyledTableCell align="left">{item.Reconciled}</StyledTableCell>
                  <StyledTableCell align="left">{item.COW_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.COW_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_HW_PAC_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_HW_PAC_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.Imp_PAC_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.Imp_PAC_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_SW_PAC_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_SW_PAC_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.Capitalization_Supply_HW}</StyledTableCell>
                  <StyledTableCell align="left">{item.Capitalization_Imp}</StyledTableCell>
                  <StyledTableCell align="left">{item.Capitalization_Supply_SW}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
}

export default UploadExcellData;
