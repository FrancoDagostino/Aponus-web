import { useEffect, useState } from "react";
import { IStockHook } from "./hooks/useStock.hook";
import LayoutComponent from "../../components/layout";
import TabsCategoryComponentType from "./components/TabsCategoryType.component";
import StockListableComponent from "./components/StockListTable.component";
import ModalNewStockComponent from "./components/ModalNewStock.component";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import ProductCategorySelectsComponent from "../productList/components/ProductCategorySelects.component";
import { IProductListHook } from "../productList/hooks/useProductList.hook";
import { ICategoryHook } from "../categoryList/hooks/useDbCategory.hook";
import StockProductListTableComponent from "./components/StockProductListTable.component";
import { IPostUpdateStock } from "./model/stockList.model";
import SnackBarConfirmed from "../../components/SnackBar/SnackBarConfirmed";

interface IStockProps {
  stockHook: IStockHook;
  productListHook: IProductListHook;
  categoryHook: ICategoryHook;
  onNavigate?: (url: string) => void;
}

const StockListModule: React.FC<IStockProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [valueTabs, setValueTabs] = useState<number>(0);
  const [newStock, setNewStock] = useState<IPostUpdateStock>({
    destino: "",
    id: "",
    operador: "",
    valor: 0,
  });
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [idDescriptionFounded, setIdDescriptionFounded] = useState<string>("");
  const [idTypeProductFounded, setIdTypeProductFounded] = useState<string>("");
  const [idDescriptionProductFounded, setIdDescriptionProductFounded] =
    useState<string>("");
  const onInitHandler = () => {
    props.stockHook.getStockTypeListAction();
    props.categoryHook.getCategoryListAction();
  };
  useEffect(() => {
    onInitHandler();
  }, []);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValueTabs(newValue);
  };

  const onChangeTabsHandler = async (idDescription: string) => {
    setIdDescriptionFounded(idDescription);
    await props.stockHook.getDbStockListForDescriptionAction(idDescription);
  };

  const onSelectDescriptionTypeHandler = async (
    idTipo: string,
    idDescription: string
  ) => {
    await props.stockHook.getStockProductListForTypeAndDescriptionAction(
      idTipo,
      idDescription
    );
    setIdDescriptionProductFounded(idDescription);
  };

  const onSelectCategoryTypeHandler = async (idType: string) => {
    await props.categoryHook.getDescriptionListAction(idType);
    await props.stockHook.getStockProductListAction(idType);
    setIdTypeProductFounded(idType);
  };

  const onCloseEditModalHandler = () => {
    setIsOpen(false);
  };

  const onOpenEditModalHandler = (newStock: IPostUpdateStock) => {
    setNewStock(newStock);
    setIsOpen(true);
  };

  const onEditStockHandler = async (valueNewStock: number) => {
    const newStockUpdate: IPostUpdateStock = {
      ...newStock,
      valor: valueNewStock,
    };
    await props.stockHook.postDbUpdateStockAction(newStockUpdate);
    if (newStock.destino !== "Cantidad")
      await props.stockHook.getDbStockListForDescriptionAction(
        idDescriptionFounded
      );
    else await props.stockHook.getStockProductListAction(idTypeProductFounded);

    onCloseEditModalHandler();
    setOpenSnackBar(true);
  };

  const onCloseSnackBarHandler = () => {
    setOpenSnackBar(false);
  };
  return (
    <LayoutComponent>
      <>
        <h1>Título de la Sección</h1>
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <AppBar position="static">
            <Tabs
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              value={valueTabs}
              onChange={handleChangeTabs}
            >
              <Tab
                label="Stock Productos"
                sx={{ fontFamily: "Rubik-Bold" }}
              ></Tab>
              <Tab
                label="Stock Insumos"
                sx={{ fontFamily: "Rubik-Bold" }}
              ></Tab>
            </Tabs>
          </AppBar>
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "30px",
            display: `${valueTabs === 0 ? "none" : "block"}`,
          }}
        >
          <TabsCategoryComponentType
            categoryTypeList={props.stockHook.categoryTypeList}
            onChangeTabsHandler={onChangeTabsHandler}
          />
          <StockListableComponent
            data={props.stockHook.stockListForDescription}
            onOpenEditModalHandler={onOpenEditModalHandler}
          />
          <h1>listado de insumos</h1>
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "30px",
            display: `${valueTabs === 1 ? "none" : "block"}`,
          }}
        >
          <ProductCategorySelectsComponent
            categoryList={props.categoryHook.categoryList}
            onSelectCategoryTypeHandler={onSelectCategoryTypeHandler}
            descriptionList={props.categoryHook.descriptionList}
            onSelectDescriptionTypeHandler={onSelectDescriptionTypeHandler}
          />
          {props.stockHook.productList.map((product, index) => (
            <div style={{ width: "100%", marginTop: "50px" }} key={index}>
              <h3 style={{}}>{product.descripcionTipo}</h3>
              {
                product.descripcionProductos.map(p => (
                  <StockProductListTableComponent
                    data={p.productos}
                    onOpenEditModalHandler={onOpenEditModalHandler}
                  />
                ))
              }
            </div>
          ))}
        </Box>
        <SnackBarConfirmed
          openSnackBar={openSnackBar}
          onCloseSnackBar={onCloseSnackBarHandler}
        />
        <ModalNewStockComponent
          isOpen={isOpen}
          onCloseEditModalHandler={onCloseEditModalHandler}
          onEditStockHandler={onEditStockHandler}
        />
      </>
    </LayoutComponent>
  );
};

export default StockListModule;
