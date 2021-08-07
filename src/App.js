import React from "react";

class AppComponent extends React.Component {
  initData = "0x6E0282F6B04DCa3CFd5921447F7656130b7cC1aa";
  state = {
    treeData: {}
  }
  render() {
    return (
      <div className="treecontainer">
        <InitComponent addChild={this.onAddChild} data={this.initData} state={this.state}>
        </InitComponent>
      </div>
    );
  }

  onAddChild = (val) => {
    fetch(`https://tagcoin.herokuapp.com/v1/summary/childrenOf/${val}`)
      .then((response) => response.json())
      .then((data) => {
        let st = this.state.treeData;
        if (!st.hasOwnProperty(data._id)) {
          this.setState({ treeData: { ...this.state.treeData, [data._id]: data.children } });
        }
      }
      );
  }
}

const test = (val, addChild, pro) => {
  return (
    val.map((val) => (
      <ChildComponent key={val} addChild={addChild} data={pro} id={val} />
    ))
  )
}

const InitComponent = props => {
  let x = props.data;
  return (
    <ul>
      <li>
        <input type="checkbox" id={"ch" + x} value={x} onClick={() => props.addChild(x)} />
        <label htmlFor={"ch" + x}>{x}</label>
        <ul>
          {props.state.treeData[x] ? test(props.state.treeData[x], props.addChild, props.state.treeData) : ''}
        </ul>
      </li>
    </ul>
  );
}

const ChildComponent = props => {
  return (
    <li>
      <input type="checkbox" id={"ch" + props.id} value={props.id} onClick={() => props.addChild(props.id)} />
      <label htmlFor={"ch" + props.id}>{props.id}</label>
      <ul>
        {props.data[props.id] ? test(props.data[props.id], props.addChild, props.data) : ''}
      </ul>
    </li>
  );
}

export default AppComponent;