import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { visuallyHidden } from "@mui/utils";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { TextField } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import SearchBar from "material-ui-search-bar";
const style = {
  position: "absolute",
  top: "10%",
  left: "0%",
  overflow: "scroll",
  height: "100%",
  display: "block",
  outline: "none",
  border: "none",
  p: 4,
};
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    dropDown,
    subTitle,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {dropDown && (
          <TableCell padding={"normal"}>
            <TableSortLabel> </TableSortLabel>
          </TableCell>
        )}

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, title } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const Row = (props) => {
  const [open, setOpen] = useState(false);

  const {
    headCells,
    Edit,
    Delete,
    row,
    rows,
    subColumnName,
    handleOpenEdit,
    setAddSubValues,
    handleOpenDelete,
    handleOpenSubEdit,
    handleOpenSubDelete,
    handleOpenSubAdd,
    dropDown,
    subHeadCells,
    subTitle,
  } = props;

  const subRow = row[subColumnName];
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <TableRow>
        {dropDown && (
          <TableCell scope="row" width={{ widht: "10%" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {headCells.map((val, index) => {
          return (
            <TableCell
              scope="row"
              key={index}
              width={val.width}
              align={typeof row[val.id] == "boolean" ? "center" : "left"}
            >
              {typeof row[val.id] == "boolean" ? (
                row[val.id] == true ? (
                  <CheckBoxIcon style={{ fill: "lightgreen" }} />
                ) : (
                  <CheckBoxOutlineBlankIcon style={{ fill: "lightgreen" }} />
                )
              ) : (
                row[val.id]
              )}
            </TableCell>
          );
        })}

        {Edit && (
          <TableCell align="right" width="1%">
            <EditIcon color="primary" onClick={() => handleOpenEdit(row)} />
          </TableCell>
        )}
        {Delete && (
          <TableCell align="right" width="1%">
            <DeleteForeverIcon
              color="error"
              onClick={() => handleOpenDelete(row)}
            />
          </TableCell>
        )}
      </TableRow>

      {dropDown && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 5, boxShadow: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ margin: 5 }}
                >
                  {subTitle}
                </Typography>
                <TextField
                  id="search"
                  name="Search"
                  label="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  sx={{ m: 1, width: "60%" }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  sx={{ height: "50px", width: "30%", m: 1 }}
                  onClick={() => handleOpenSubAdd(row)}
                >
                  Add New
                </Button>
                <Table size="small" aria-label="purchases" sx={{ margin: 1 }}>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={5}
                    headCells={subHeadCells}
                    subTitle={subTitle}
                  />
                  <TableBody>
                    {stableSort(subRow, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((subRow, index) => {
                        var result = false;
                        const b = query.toLowerCase().trim();
                        const head = subHeadCells.map(({ id }) => id);
                        if (subRow)
                          for (const key in subRow) {
                            if (subRow[key]) {
                              const a = subRow[key]
                                .toString()
                                .toLowerCase()
                                .trim();
                              if (a.includes(b) && head.includes(key)) {
                                result = true;
                                break;
                              }
                            }
                          }
                        if (!result && b != "") return null;

                        return (
                          <TableRow key={index}>
                            {subHeadCells.map((val, index) => {
                              return (
                                <TableCell
                                  scope="subRow"
                                  key={index}
                                  width={val.width}
                                  align={
                                    typeof subRow[val.id] == "boolean"
                                      ? "center"
                                      : "left"
                                  }
                                >
                                  {typeof subRow[val.id] == "boolean" ? (
                                    subRow[val.id] == true ? (
                                      <CheckBoxIcon
                                        style={{ fill: "lightgreen" }}
                                      />
                                    ) : (
                                      <CheckBoxOutlineBlankIcon
                                        style={{ fill: "lightgreen" }}
                                      />
                                    )
                                  ) : (
                                    subRow[val.id]
                                  )}
                                </TableCell>
                              );
                            })}

                            {Edit && (
                              <TableCell align="right" width="  1%">
                                <EditIcon
                                  color="primary"
                                  onClick={() =>
                                    handleOpenSubEdit({ row, index })
                                  }
                                />
                              </TableCell>
                            )}
                            {Delete && (
                              <TableCell align="right" width="1%">
                                <DeleteForeverIcon
                                  color="error"
                                  onClick={() =>
                                    handleOpenSubDelete({ row, index })
                                  }
                                />
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const {
    headCells,
    rows,
    title,
    Edit,
    Delete,
    Add,
    onUpdate,
    dropDown,
    subColumnName,
    subHeadCells,
    subTitle,
    SubEdit,
    SubDelete,

    SubAdd,
  } = props;

  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // ======================================================

  const [openEdit, setOpenEdit] = useState(false);
  const [editValues, setEditValues] = useState({});
  const handleCloseEdit = () => {
    setEditValues({});
    setOpenEdit(false);
  };
  const handleOpenEdit = (values) => {
    setEditValues(values);
    setOpenEdit(true);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteValues, setDeleteValues] = useState({});
  const handleCloseDelete = () => {
    setDeleteValues({});
    setOpenDelete(false);
  };
  const handleOpenDelete = (values) => {
    setDeleteValues(values);
    setOpenDelete(true);
  };

  const [openAdd, setOpenAdd] = useState(false);
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleOpenAdd = (values) => {
    setOpenAdd(true);
  };
  // ======================================================
  const [openSubEdit, setOpenSubEdit] = useState(false);
  const [editSubValues, setEditSubValues] = useState({});
  const handleCloseSubEdit = () => {
    setEditSubValues({});
    setOpenSubEdit(false);
  };
  const handleOpenSubEdit = (values) => {
    setEditSubValues(values);
    setOpenSubEdit(true);
  };

  const [openSubDelete, setOpenSubDelete] = useState(false);
  const [deleteSubValues, setDeleteSubValues] = useState({});
  const handleCloseSubDelete = () => {
    setDeleteSubValues({});
    setOpenSubDelete(false);
  };
  const handleOpenSubDelete = (values) => {
    setDeleteSubValues(values);
    setOpenSubDelete(true);
  };

  const [openSubAdd, setOpenSubAdd] = useState(false);
  const [addSubValues, setAddSubValues] = useState({});
  const handleCloseSubAdd = (values) => {
    setAddSubValues({});
    setOpenSubAdd(false);
  };
  const handleOpenSubAdd = (values) => {
    setAddSubValues(values);
    setOpenSubAdd(true);
  };
  // ======================================================
  useEffect(() => {
    onUpdate();
  });
  // ======================================================
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Box sx={{ width: "100%" }}>
      {SubAdd && (
        <Modal
          open={openSubAdd}
          onClose={handleCloseSubAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={style}
        >
          <Fade in={openSubAdd}>
            <Box className="border-none outline-none">
              <SubAdd
                handleCloseSubAdd={handleCloseSubAdd}
                editSubValues={addSubValues}
              />
              <Button
                onClick={handleCloseSubAdd}
                variant="contained"
                className="bottom-24 left-2/4 transform -translate-x-1/2 -translate-y-1/2"
              >
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      )}
      {SubEdit && (
        <Modal
          open={openSubEdit}
          onClose={handleCloseSubEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={style}
        >
          <Fade in={openSubEdit}>
            <Box className="border-none outline-none">
              <SubEdit
                handleCloseEdit={handleCloseSubEdit}
                editSubValues={editSubValues}
              />
              <Button
                onClick={handleCloseSubEdit}
                variant="contained"
                className="bottom-24 left-2/4 transform -translate-x-1/2 -translate-y-1/2"
              >
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      )}
      {SubDelete && (
        <Modal
          open={openSubDelete}
          onClose={handleCloseSubDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={style}
        >
          <Fade in={openSubDelete}>
            <Box className="border-none outline-none">
              <SubDelete
                editSubValues={deleteSubValues}
                handleCloseSubDelete={handleCloseSubDelete}
              />
            </Box>
          </Fade>
        </Modal>
      )}
      {Add && (
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={style}
        >
          <Fade in={openAdd}>
            <Box className="border-none outline-none">
              <Add handleCloseAdd={handleCloseAdd} />
              <Button
                onClick={handleCloseAdd}
                variant="contained"
                className="bottom-24 left-2/4 transform -translate-x-1/2 -translate-y-1/2"
              >
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      )}

      {Edit && (
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={style}
        >
          <Fade in={openEdit}>
            <Box className="border-none outline-none">
              <Edit handleCloseEdit={handleCloseEdit} editValues={editValues} />
              <Button
                onClick={handleCloseEdit}
                variant="contained"
                className="bottom-24 left-2/4 transform -translate-x-1/2 -translate-y-1/2"
              >
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      )}

      {Delete && (
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={style}
        >
          <Fade in={openDelete}>
            <Box className="border-none outline-none">
              <Delete
                editValues={deleteValues}
                handleCloseDelete={handleCloseDelete}
              />
            </Box>
          </Fade>
        </Modal>
      )}

      <Paper sx={{ width: "100%", mb: 2 }}>
        {Add && (
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{ height: "50px", width: "30%", m: 5 }}
            onClick={handleOpenAdd}
          >
            Add New
          </Button>
        )}
        <TextField
          fullWidth
          id="search"
          name="Search"
          label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ my: 1 }}
        />
        <EnhancedTableToolbar numSelected={selected.length} title={title} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
              dropDown={dropDown}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  var result = false;
                  const b = query.toLowerCase().trim();
                  const head = headCells.map(({ id }) => id);

                  if (row)
                    for (const key in row) {
                      if (row[key]) {
                        const a = row[key].toString().toLowerCase().trim();
                        if (a.includes(b) && head.includes(key)) {
                          result = true;
                          break;
                        }
                      }
                    }
                  if (!result && b != "") return null;

                  return (
                    <Row
                      key={index}
                      row={row}
                      rows={rows}
                      Edit={Edit}
                      Delete={Delete}
                      dropDown={dropDown}
                      subTitle={subTitle}
                      headCells={headCells}
                      subHeadCells={subHeadCells}
                      subColumnName={subColumnName}
                      handleOpenEdit={handleOpenEdit}
                      setAddSubValues={setAddSubValues}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenSubAdd={handleOpenSubAdd}
                      handleOpenSubEdit={handleOpenSubEdit}
                      handleOpenSubDelete={handleOpenSubDelete}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
