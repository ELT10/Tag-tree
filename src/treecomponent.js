import React from "react";

class TreeComponent extends React.Component {
    state = {
        treeData: {},
        salesData: {}
    }
    render() {
        return (
            <div className="tree">
                <InitComponent addChild={this.onAddChild} data={this.props.data} state={this.state} sales={this.fetchsales}>
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

    fetchsales = (val) => {
        fetch(`https://tagcoin.herokuapp.com/v1/summary/childrenOf/${val}`)
            .then((response) => response.json())
            .then((data) => {
                let st = this.state.salesData;
                if (!st.hasOwnProperty(data._id)) {
                    if (data.salesFromChain)
                        this.setState({ salesData: { ...this.state.salesData, [data._id]: data.salesFromChain } });
                    else
                        this.setState({ salesData: { ...this.state.salesData, [data._id]: 0 } });
                }
            }
            )
    }
}

const test = (val, addChild, pro, sales, sfn) => {
    return (
        val.map((val) => (
            <ChildComponent key={val} addChild={addChild} data={pro} id={val} sales={sales} sfn={sfn} />
        ))
    )
}

const InitComponent = props => {
    let x = props.data;
    props.sales(x);
    return (
        <ul>
            <li className="nodeone">
                <input type="checkbox" id={"ch" + x} value={x} onClick={() => props.addChild(x)} />
                <label htmlFor={"ch" + x} className="item"><span className="symbol"></span><span className="wadd">{x.slice(0, 5) + '.....' + x.slice(-5)}</span><span className="pcount">{props.state.salesData[x]}</span></label>
                <ul>
                    {props.state.treeData[x] ? test(props.state.treeData[x], props.addChild, props.state.treeData, props.state.salesData, props.sales) : ''}
                </ul>
            </li>
        </ul>
    );
}

const ChildComponent = props => {
    let v = props.sales;
    if (!v.hasOwnProperty(props.id)) {
        props.sfn(props.id);
    }
    return (
        <li>
            <input type="checkbox" id={"ch" + props.id} value={props.id} onClick={() => props.addChild(props.id)} />
            <label htmlFor={"ch" + props.id} className="item"><span className="symbol"></span><span className="wadd">{props.id}</span><span className="pcount">{props.sales[props.id]}</span></label>
            <ul>
                {props.data[props.id] ? test(props.data[props.id], props.addChild, props.data, props.sales, props.sfn) : ''}
            </ul>
        </li>
    );
}

export default TreeComponent;