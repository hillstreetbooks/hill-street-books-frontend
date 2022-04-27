import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { Button, Loader, PopupModal } from '../../components';
import { AdminService } from '../../services';
import { useModal } from '../../hooks';
import './Dashboard.scss';

const Dashboard = () => {
  const userInfo = useSelector((state) => state.user.info);
  const [authors, setAuthors] = useState([]);
  const [isLoading, updateLoader] = useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [showAlert, setShowAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const performAction = (action, id, event) => {
    event.stopPropagation();
    setSelectedAuthor(id);
    setTitle(action);
    toggleVisibility(!show);
  };

  const handleAction = () => {
    console.log('Inside handleAction');
    switch (title) {
      case 'Publish':
        publishAuthor();
        break;
      case 'Unpublish':
        unpublishAuthor();
        break;
      case 'Remove':
        removeAuthor();
        break;
    }
  };

  const publishAuthor = () => {
    const { token } = userInfo;
    updateLoader(true);
    toggleVisibility(!show);
    AdminService.publishAuthorContentPage(selectedAuthor, value, token)
      .then((response) => {
        console.log(response);
        setShowAlert({
          show: !showAlert,
          message:
            response ||
            'Oops, Something went wrong! Please contact the administrator.'
        });

        updateLoader(false);
        fetchAuthors();
      })
      .catch((error) => {
        updateLoader(false);
        setShowAlert({
          show: !showAlert,
          message:
            'Oops, Something went wrong! Please contact the administrator.'
        });
        console.log(error);
      });
  };

  const unpublishAuthor = () => {
    const { token } = userInfo;
    updateLoader(true);
    toggleVisibility(!show);
    AdminService.unpublishAuthorContentPage(selectedAuthor, value, token)
      .then((response) => {
        console.log(response);
        setShowAlert({
          show: !showAlert,
          message:
            response ||
            'Oops, Something went wrong! Please contact the administrator.'
        });

        updateLoader(false);
        fetchAuthors();
      })
      .catch((error) => {
        updateLoader(false);
        setShowAlert({
          show: !showAlert,
          message:
            'Oops, Something went wrong! Please contact the administrator.'
        });
        console.log(error);
      });
  };

  const removeAuthor = () => {
    const { token } = userInfo;
    updateLoader(true);
    toggleVisibility(!show);
    AdminService.removeAuthorContentPage(selectedAuthor, value, token)
      .then((response) => {
        console.log(response);
        setShowAlert({
          show: !showAlert,
          message:
            response ||
            'Oops, Something went wrong! Please contact the administrator.'
        });

        updateLoader(false);
        fetchAuthors();
      })
      .catch((error) => {
        updateLoader(false);
        setShowAlert({
          show: !showAlert,
          message:
            'Oops, Something went wrong! Please contact the administrator.'
        });
        console.log(error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, headerAlign: 'center' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'username',
      headerName: 'Username (Email)',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'verified',
      headerName: 'Verified',
      type: 'boolean',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'hasAuthorContent',
      headerName: 'Author Content Page',
      type: 'boolean',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'lastUpdated',
      headerName: 'Last Updated',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'isPublished',
      headerName: 'Published',
      type: 'boolean',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      headerAlign: 'center',
      sortable: false,
      renderCell: ({ id, row }) => {
        return (
          <div className="actions-wrapper">
            <Button
              buttonText="Publish"
              handleClick={(event) => performAction('Publish', id, event)}
              disabled={!row.hasAuthorContent || row.isPublished}
            />
            <Button
              buttonText="Unpublish"
              handleClick={(event) => performAction('Unpublish', id, event)}
              disabled={!row.hasAuthorContent || !row.isPublished}
            />
            <Button
              buttonText="Remove"
              handleClick={(event) => performAction('Remove', id, event)}
              disabled={!row.hasAuthorContent}
            />
          </div>
        );
      }
    }
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport
          csvOptions={{
            fileName: `Hill-Street-Books-Authors-${moment().format(
              'DD-MM-YYYY'
            )}`
          }}
        />
      </GridToolbarContainer>
    );
  };

  const fetchAuthors = () => {
    const { token } = userInfo;
    updateLoader(true);
    AdminService.fetchAuthors(token)
      .then((response) => {
        console.log(response);
        response.forEach((item) => {
          item['id'] = item?._id;
          delete item._id;
        });
        setAuthors(response);
        updateLoader(false);
      })
      .catch((error) => {
        updateLoader(false);
        toggleVisibility(!show);
        setModalMessage(
          'Oops, Something went wrong! Please contact the administrator.'
        );
        console.log(error);
      });
  };

  const {
    modalMessage,
    show,
    title,
    value,
    setModalMessage,
    setTitle,
    setValue,
    toggleVisibility,
    handleModalSubmit
  } = useModal(handleAction);

  useEffect(() => {
    fetchAuthors();
  }, []);
  return (
    <div className="dashboard-wrapper">
      <div className="authors-list">
        <DataGrid
          rows={authors}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
          }}
          rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
          disableSelectionOnClick
          checkboxSelection
          components={{
            Toolbar: CustomToolbar
          }}
          onRowClick={({ id }) => navigate(`/admin/author/${id}`)}
        />
      </div>
      <PopupModal
        show={show}
        toggleVisibility={() => toggleVisibility(!show)}
        message={modalMessage}
      />
      {isLoading ? <Loader /> : null}
      <PopupModal
        show={show}
        title={title}
        toggleVisibility={() => toggleVisibility(!show)}
      >
        <TextField
          id="outlined-basic"
          value={value.value}
          name="reason"
          onChange={(event) => {
            setValue({ ...value, value: event?.target?.value || '' });
          }}
          multiline
          minRows={4}
          variant="outlined"
          placeholder="Enter Reason here"
          error={value.error === '' ? false : true}
          helperText={value.error}
        />
        <Button
          buttonText="Notify Author"
          handleClick={(event) => handleModalSubmit(event)}
        />
      </PopupModal>
      <PopupModal
        show={showAlert.show}
        toggleVisibility={() =>
          setShowAlert({ ...showAlert, show: !showAlert })
        }
        message={showAlert.message}
      />
    </div>
  );
};

export default Dashboard;
