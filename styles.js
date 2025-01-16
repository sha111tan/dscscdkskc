import { StyleSheet } from "react-native";

export default StyleSheet.create({
  body: {
    margin: 0,
    overflowY: "scroll",
    overflowX: "hidden",
    backgroundColor: "#ffffff",
    height: "100%",
    minHeight: "100%",
    width: "100%",
    position: "relative",
    zIndex: -10,
    // React Native не поддерживает background-image напрямую, используйте View с компонентом Image для фона
  },
  orderTable: {
    width: "100%",
    backgroundColor: "lemonchiffon",
    borderWidth: 0, // React Native не поддерживает border-collapse, границы задаются отдельно
  },
  orderTableTh: {
    textAlign: "center",
    backgroundColor: "goldenrod",
    color: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: "goldenrod",
  },
  orderTableTd: {
    textAlign: "left",
    paddingLeft: 30,
  },
  addProduct: {
    marginTop: "calc(3vh + 1%)", // Замените на эквивалентную высоту в пикселях или процентах
    marginBottom: "calc(5vh + 1%)",
  },
});
