import {Component} from "react";

class ReadContent extends Component {
    render() {
        var list = [];
        var li = this.props.li;
        if (li != null) {
            for (var i = 0; i < li.length; i++) {
                list.push(
                    <li key={li[i]}>{li[i]}</li>
                );
            }
        }
        return (
            <article>
                <h2>{this.props.title}</h2>
                <p>{this.props.desc}</p>
                <ol>
                    {list}
                </ol>

            </article>
        );
    }
}

export default ReadContent;