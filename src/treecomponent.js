import React from "react";

class TreeComponent extends React.Component {
    state = {
        treeData: {},
        salesData: {},
        tokensData: {}
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
        if (!this.state.treeData[val]) {
            fetch(`https://tagcoin.herokuapp.com/v1/summary/childrenOf/${val}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("fetch");
                    let st = this.state.treeData;
                    if (!st.hasOwnProperty(data._id)) {
                        this.setState({ treeData: { ...this.state.treeData, [data._id]: data.children } });
                    }
                }
                );
        }
    }

    fetchsales = (val) => {
        fetch(`https://tagcoin.herokuapp.com/v1/summary/childrenOf/${val}`)
            .then((response) => response.json())
            .then((data) => {
                let st = this.state.salesData;
                let td = this.state.tokensData;
                if (!st.hasOwnProperty(data._id)) {
                    if (data.salesFromChain)
                        this.setState({ salesData: { ...this.state.salesData, [data._id]: data.salesFromChain } });
                    else
                        this.setState({ salesData: { ...this.state.salesData, [data._id]: 0 } });
                }
                if (!st.hasOwnProperty(data._id)) {
                    if (data.tokensPurchased)
                        this.setState({ tokensData: { ...this.state.tokensData, [data._id]: data.tokensPurchased } });
                    else
                        this.setState({ tokensData: { ...this.state.tokensData, [data._id]: 0 } });
                }
            }
            )
    }
}

const test = (val, addChild, pro, sales, sfn, tokdata) => {
    return (
        val.map((val) => (
            <ChildComponent key={val} addChild={addChild} data={pro} id={val} sales={sales} sfn={sfn} tokdata={tokdata} />
        ))
    )
}

const InitComponent = props => {
    let x = props.data;
    props.sales(x);
    return (
        <ul className="firstul">
            <li className="nodeone">
                <input type="checkbox" id={"ch" + x} onClick={(e) => props.addChild(x)} />
                <label htmlFor={"ch" + x} className="item"><span className="symbol"></span>{props.state.tokensData[x] !== 0 ? <span className="tokencount"> {props.state.tokensData[x]} </span> : ''}<span className="wadd">{x.slice(0, 5) + '.....' + x.slice(-5)}</span><span className="pcount">{props.state.salesData[x]}</span></label>
                <ul>
                    {props.state.treeData[x] ? test(props.state.treeData[x], props.addChild, props.state.treeData, props.state.salesData, props.sales, props.state.tokensData) : ''}
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
            <input type="checkbox" id={"ch" + props.id} onClick={(e) => props.addChild(props.id)} />
            <label htmlFor={"ch" + props.id} className="item"><span className="symbol"></span><span className="tokencount">{props.tokdata[props.id]}</span><span className="wadd">{props.id.slice(0, 5) + '.....' + props.id.slice(-5)}</span><span className="pcount">{props.sales[props.id]}</span></label>
            <ul>
                {props.data[props.id] ? test(props.data[props.id], props.addChild, props.data, props.sales, props.sfn, props.tokdata) : ''}
            </ul>
        </li>
    );
}

export default TreeComponent;