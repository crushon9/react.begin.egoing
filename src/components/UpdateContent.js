import {Component} from "react";

class UpdateContent extends Component {
    constructor(props) {
        /* props 데이터를 input에 바로 쓰면 리액트가 readonly 처리하기때문에 state로 받아서 값을 변경 */
        super(props);
        this.state = {
            id:this.props.data.id,
            title:this.props.data.title,
            desc:this.props.data.desc
        }
        this.inputFormHandler = this.inputFormHandler.bind(this); /* 반복되는 bind(this) 리팩토링 */
    }
    inputFormHandler(e) {
        this.setState({[e.target.name]: e.target.value});
        /* e.target:form에서 담은 데이터 */
        /* [e.target.name] : 이벤트가 일어난 태그의 name */
    }
    render() {
        return (
            <article>
                <h2>Update</h2>
                <form action="/update_proc" method="post"
                      onSubmit={function (e) {
                        e.preventDefault();
                        this.props.onSubmit(this.state.id, this.state.title, this.state.desc);
                        /* onChange 이벤트로 state와 e.target이 동기화가 되니까 state로 넣어줘도 됨*/
                }.bind(this)}>
               {/** <p><input type="text" name="title" value={data.title}/></p>
                    <p><textarea name="desc" value={data.desc}/></p>
                    Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field.
                    위와 같이 props 데이터를 그냥 input에 쓰면 readonly 처리됨 */}
                    <p><input type="text" name="title"
                              value={this.state.title}
                              onChange={this.inputFormHandler}
                    /></p>
                    <p><textarea name="desc"
                                 value={this.state.desc}
                                 onChange={this.inputFormHandler}
                    /></p>
                    <p><input type="submit"/></p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;