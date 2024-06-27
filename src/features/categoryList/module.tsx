import { FC, useEffect, useState } from "react";
import { ICategoryHook } from "./hooks/useDbCategory.hook";
import LayoutComponent from "../../components/layout";
import CategoryListComponent from "./components/CategoryListComponent.component";
import ModalCategoryOrDescriptionComponent from "./components/ModalCategoryOrDescription.component";
import { Box, Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

//TODO: AGREGAR PARA EDITAR Y ELIMINAR UNA CATEGORÍA
//TODO: AGREGAR LA EDICION Y CREACION DE UNA NUEVA DESCRIPCIÖN
interface IAddOrUpdateCategory {
  labelModal: string;
  idCategory: string;
  category: string
}

interface ICategoryModuleProps {
  categoryHook: ICategoryHook;
  onNavigate?: (url: string) => void;
}

const CategoryListModule: FC<ICategoryModuleProps> = (props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addOrUpdateCategory, setAddOrUpdateCategory] = useState<IAddOrUpdateCategory>({
    idCategory: '',
    labelModal: 'Nueva Categoría',
    category: ''
  })

  useEffect(() => {
    onInitHandler();
  }, []);

  const onInitHandler = () => {
    props.categoryHook.getCategoryListAction();
  };

  const onOpenModalHandler = (labelModal: string, idCategory: string) => {
    setAddOrUpdateCategory({
      ...addOrUpdateCategory,
      labelModal,
      idCategory
    })
    setIsOpen(true)
  }
  const onCloseModalHandler = () => {
    setIsOpen(false);
    setAddOrUpdateCategory({
      category: '',
      labelModal: 'Nueva Categoría',
      idCategory: ''
    })
  };

  const onAddOrUpdateHandler = async (category: string) => {
    await props.categoryHook.AddCategoryAction(category, addOrUpdateCategory.idCategory);
    await props.categoryHook.getCategoryListAction()
  }


  return (
    <>
      <LayoutComponent>
        <>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <h1>Título de la Sección</h1>
            <Button
              sx={{ height: 50, width: 300, marginLeft: "20px", marginTop: "15px", gap: 1 }}
              variant="contained"
              onClick={() => setIsOpen(true)}
              startIcon={<AddCircleOutlinedIcon />}
            >
              Nueva Categoria
            </Button>
          </Box>
          <CategoryListComponent data={props.categoryHook.categoryList} onOpenModal={onOpenModalHandler} />

        </>
      </LayoutComponent>
      <ModalCategoryOrDescriptionComponent isOpen={isOpen} modalLabel={addOrUpdateCategory.labelModal} onClose={onCloseModalHandler} onAddOrUpdateCategory={onAddOrUpdateHandler} />
    </>
  );
};
export default CategoryListModule;
