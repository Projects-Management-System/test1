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
  const [validationError, setvalidationError] = useState('');
  const [dateValidationError, setDateValidationError] = useState('');
  const [tablecelColor, settablecelColor] = useState('#ffffff');

  const changeFileHandler = () => {
    setItems([]);
  };

  const errorHandler = () => {
    for (let i = 0; i < items.length; i += 1) {
      if (
        !items[i].Implementation_By ||
        !items[i].Project ||
        !items[i].Scope ||
        // !items[i].HO_Date ||
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
      parseInt(items[i].HO_Date.slice(0, 4), 10);
      if (items[i].HO_Date) {
        if (
          typeof parseInt(items[i].HO_Date.slice(0, 4), 10) === 'number' &&
          typeof parseInt(items[i].HO_Date.slice(5, 7), 10) === 'number' &&
          typeof parseInt(items[i].HO_Date.slice(8, 10), 10) === 'number' &&
          parseInt(items[i].HO_Date.slice(0, 4), 10) !== 'NaN' &&
          parseInt(items[i].HO_Date.slice(5, 7), 10) !== 'NaN' &&
          parseInt(items[i].HO_Date.slice(8, 10), 10) !== 'NaN'
        ) {
          console.log(typeof parseInt(items[i].HO_Date.slice(0, 4), 10));
          console.log(parseInt(items[i].HO_Date.slice(0, 4), 10));
          console.log('No Handover Date validation error!');
        } else if (
          typeof parseInt(items[i].HO_Date.slice(0, 4), 10) === 'number' &&
          typeof parseInt(items[i].HO_Date.slice(5, 7), 10) === 'number' &&
          typeof parseInt(items[i].HO_Date.slice(8, 10), 10) === 'number' &&
          (parseInt(items[i].HO_Date.slice(0, 4), 10) === 'NaN' ||
            parseInt(items[i].HO_Date.slice(5, 7), 10) === 'NaN' ||
            parseInt(items[i].HO_Date.slice(8, 10), 10) === 'NaN')
        ) {
          console.log(typeof items[i].HO_Date.slice(0, 4));
          console.log(parseInt(items[i].HO_Date.slice(0, 4), 10));
          console.log('Handover Date validation error!');
          setvalidationErrorMessage('Invalid Handover date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 20000);
        }
      } else if (!items[i].HO_Date) {
        console.log('No Date validation error! Date is perfect');
      }
    }
  };

  // paramaeters change with change of items
  useEffect(() => {
    setvalidationError('');
    settablecelColor('');
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
    } else {
      axios
        .post('http://localhost:8072/vendorProjectsDatabasesExcell/upload', newPost)
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
