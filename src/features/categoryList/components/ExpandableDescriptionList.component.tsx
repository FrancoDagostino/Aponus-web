import { FC, useEffect, useState } from "react";
import {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
import {
  IListadoCategorias,
  IListadoDescripciones,
} from "../model/category.model";
import { useExpandableTableContext } from "../../../context/ExpandableTableProvider";
import DataTableComponent from "../../../components/DataTable/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, TextField, Button, IconButton } from "@mui/material";

const ExpandableDescriptionListComponentProps: FC<
  ExpanderComponentProps<IListadoCategorias>
> = (props) => {
  const { handleSelectListDescription, handlAddOrUpdateDescription, handleUpdateDescription } =
    useExpandableTableContext();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [descriptionList, setDescriptionList] = useState<
    IListadoDescripciones[]
  >([]);
  const [idDescription, setIdDescription] = useState<number>(0);
  const [isEnabledInput, setIsEnabledInput] = useState<boolean>(true);

  useEffect(() => {
    handleCallDescritionList(props.data.idTipo);
  }, [props.data.idTipo]);

  const handleCallDescritionList = async (idType: string) => {
    const list = await handleSelectListDescription(idType);
    setDescriptionList(list);
  };

  const onEditDescriptionHandler = async (row: IListadoDescripciones) => {
    setIsEdit(true);
    setInputValue(row.descripcion);
    setIdDescription(row.idDescripcion)
    setIsEnabledInput(false);
  };

  const onAddOrUpdateDescriptionHandler = async () => {


    if (!isEdit) {

      await handlAddOrUpdateDescription(inputValue, "AB_PVC");
    } else {
      await handleUpdateDescription(idDescription, inputValue)
    }
  };
  const columnDescriptionComputed: Array<TableColumn<IListadoDescripciones>> = [
    {
      name: "Listado de Descripciones",
      cell: (row) => <p>{row.descripcion}</p>,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <IconButton
            aria-label="edit"
            color="secondary"
            onClick={() => onEditDescriptionHandler(row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="secondary">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleNewDescription = () => {
    setIsEnabledInput(false);
    setIsEdit(false);
    setInputValue("");
  }

  return (
    <>
      <DataTableComponent
        data={descriptionList}
        columns={columnDescriptionComputed}
        entityName="Listado de Descripciones"
      />
      <Box
        justifyContent="flex-start"
        display="flex"
        marginTop={8}
        marginLeft={5}
      >
        <TextField
          label={isEdit ? 'Editar Descripción' : 'Nueva Descripción'}
          variant="standard"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ width: "350px" }}
          disabled={isEnabledInput}
        />
        <Button
          sx={{ marginLeft: "50px", marginTop: "15px" }}
          variant="contained"
          onClick={onAddOrUpdateDescriptionHandler}
          size="small"
          disabled={!inputValue}
        >
          Guardar
        </Button>
        <Button
          sx={{ marginLeft: "50px", marginTop: "15px" }}
          variant="contained"
          size="small"
          onClick={handleNewDescription}
        >
          Nueva Descripcion
        </Button>
      </Box>
    </>
  );
};

export default ExpandableDescriptionListComponentProps;
