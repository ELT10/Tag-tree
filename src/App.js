import React from "react";

class AppComponent extends React.Component {
  initData = "0x6E0282F6B04DCa3CFd5921447F7656130b7cC1aa";
  state = {
    treeData: {}
  }
  render() {
    return (
      <div className="tree">
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
  let rando = Math.floor(Math.random() * (9999 - 1000) + 1000);
  let x = props.data;
  return (
    <ul>
      <li className="nodeone">
        <input type="checkbox" id={"ch" + x} value={x} onClick={() => props.addChild(x)} />
        <label htmlFor={"ch" + x} className="item"><span className="wadd">{x.slice(0, 5) + '.....' + x.slice(-5)}</span><span className="pcount">{rando}</span></label>
        <ul>
          {props.state.treeData[x] ? test(props.state.treeData[x], props.addChild, props.state.treeData) : ''}
        </ul>
      </li>
    </ul>
  );
}

const ChildComponent = props => {
  let rando = Math.floor(Math.random() * (9999 - 1000) + 1000);
  return (
    <li>
      <input type="checkbox" id={"ch" + props.id} value={props.id} onClick={() => props.addChild(props.id)} />
      <label htmlFor={"ch" + props.id} className="item"><span className="wadd">{props.id.slice(0, 5) + '.....' + props.id.slice(-5)}</span><span className="pcount">{rando}</span></label>
      <ul>
        {props.data[props.id] ? test(props.data[props.id], props.addChild, props.data) : ''}
      </ul>
    </li>
  );
}

export default AppComponent;