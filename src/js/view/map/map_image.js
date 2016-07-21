import React from 'react'
import ReactDOM from 'react-dom'

export default class MapImage extends React.Component {

    static defaultProps = {
        width: 100,
        height: 100
    };

    state = {
        img_src: null
    };

    constructor(props) {
        super(props);

        this.state.img_src = props.img_src;
        this.isDataLoaded = false;
    };

    componentDidMount() {
    }

    loadData() {
    };

    sizeImage(event) {
        console.log("멍미");

        var target = event.target;
        var ratio = target.naturalWidth / target.naturalHeight;
        console.log(ratio);

        var aspectRatio = this.props.width / this.props.weight;
        var measuredWidth = this.props.width / ratio;
        var measuredHeight = this.props.height / ratio;

        this.setState({
            style: {
                width: measuredWidth,
                height: measuredHeight
            }
        });
    }

    render() {
        console.log("멍미2");
        var style = {
            width: "100px",
            height: "100px",
        }

        return (
            <div>
                <image src={this.state.img_src} onload={this.sizeImage}/>
            </div>
        )
    };
}

