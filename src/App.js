import React from "react";
import TreeComponent from "./treecomponent";

class AppComponent extends React.Component {
  initData = "0x6E0282F6B04DCa3CFd5921447F7656130b7cC1aa";
  render() {
    return (
      <TreeComponent data={this.initData}>
      </TreeComponent>
    );
  }
}

export default AppComponent;