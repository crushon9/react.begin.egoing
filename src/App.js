import {Component} from "react"; // react 라는 라이브러리에서 Component라는 클래스를 로딩
import ToC from "./components/ToC" // ToC 라는 태그를 root폴더(src) 하위의 components 하위의 ToC.js 파일에서 가져온다
import Subject from "./components/Subject"
import Control from "./components/Control"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import './App.css';

// jsx : JavaScript를 확장한 문법 (html 태그를 따옴표로 표현하지 않아도 됨)
class App extends Component {
    constructor(props){ // 컴포넌트를 render 하기 전에 실행되는 생성자 초기한번실행되며 그뒤론 컴포넌트의 this안에 저장됨
        super(props); // 모든 state 초기화
        this.state = { // state 값 설정
            subject:{title:'React', sub:'페이스북에서 개발한 자바스크립트 라이브러리'},
            welcome:{title:'Welcome', desc:'Hello, React!!'},
            contents:[{id:1,title:'intro' ,desc: 'react 특징 컴포넌트 기반',
                        li:['가독성', '재사용성', '유지보수']},
                    {id:2,title:'install' ,desc:'npm/npx 을 이용하여 create-react-app 설치',
                        li:['npm - nodejs 프로그램 (영구설치)', 'npx - 임시로 설치해서 삭제하고 사용할때마다 다시 다운하여 늘 최신상태 유지']},
                    {id:3,title:'coding & run' ,desc:'수정한 코드는 실시간 반영',
                        li:['init : cmd에서 create-react-app 실행하면 실행위치 폴더에 자동 세팅','coding : src폴더의 하위파일 코드편집','run : npm run start']},
                    {id:4,title:'deploy' ,desc:'원본을 그대로 배포하면 파일용량이 크고 보안문제가 있음',
                        li:['​npm run build 명령 : build 폴더 안에 용량이 줄어든 코드파일 자동생성','npm install -g serve : 서브설치 (npm을 통해 설치가능한 간단한 웹서버)','serve -s build : 서브를 실행시킬때 build 디렉토리를 루트로 하겠다']},
            ],
            mode:'welcome', // default 값
            selected_cnt_id:0, // default 값
        }
        this.max_content_id = this.state.contents[this.state.contents.length-1].id;
        // 초기한번만 실행되기때문에 배열의 길이가 실시간으로 반영되어 변하지 않음, ui에 영향주는 변수가 아니므로 state 바깥에서 제어
    }
    getSelectedContent() {
        for(var i = 0; i < this.state.contents.length; i++){
            var content = this.state.contents[i];
            if (content.id === this.state.selected_cnt_id) {
                return content;
            }
        }
    }
    getArticle() {
        var article = null;
        if (this.state.mode === 'welcome') {
            article = <ReadContent title={this.state.welcome.title} desc={this.state.welcome.desc} li={null}></ReadContent>;
        } else if (this.state.mode === 'read') {
            article = <ReadContent title={this.getSelectedContent().title} desc={this.getSelectedContent().desc} li={this.getSelectedContent().li}></ReadContent>
        } else if (this.state.mode === 'create') {
            article = <CreateContent onSubmit={function (title,desc) {
                this.max_content_id = this.max_content_id+1;
                /** push는 원본데이터를 변경함 state 원본데이터를 직접변경하는것은 지양해야한다
                 * 왜?? 원본을 변경하면 shouldComponentUpdate에서 state데이터와 nextProps로받은 데이터를 구분할 수가 없음
                 * 왜냐면 내 생각엔
                 * 컴포넌트안에 props는 변수처럼 실제값을 들고있는게 아니라 참조만하고있음
                 * render()안에서 props가 업데이트 됨 즉 주소값이 바뀜
                 * 그 전에 호출되는 shouldComponentUpdate안에서는 this.props는 기존데이터를 참조하고 있는 상태임
                 * 그러나 기존참조의 원본데이터를 변경하면 shouldComponentUpdate안에서 기존참조와 받은참조가 주소가같고 값도 같음
                 this.state.contents.push(
                 {id:this.max_content_id, title:title, desc:desc}
                 );
                 this.setState({contents:this.state.contents});
                 this.setState({mode:'read'}); contents를 변경하고 엉뚱한 state를 set하여서 렌더링만 호출하여도 정상동작함
                 */

                /** concat은 원본데이터를 변경하지 않으며 return으로 덧붙여진 결과 복제하여 뱉음 (immutable)
                 var newContents = this.state.contents.concat(
                 {id:this.max_content_id, title:title, desc:desc}
                 );
                 */

                var newContents = Array.from(this.state.contents); // Array.from(배열) :배열복사해서 return  // Object.assign({},객체) 앞의 객체에 뒤의 객체를 덧붙여서 return
                newContents.push({id:this.max_content_id, title:title, desc:desc, li: null});
                this.setState({
                    contents: newContents,
                    mode: 'read',
                    selected_cnt_id: this.max_content_id
                });
            }.bind(this)}> {/* this :App */}
            </CreateContent>
        } else if (this.state.mode === 'update') {
            if (this.getSelectedContent() !== undefined) {
                article = <UpdateContent data={this.getSelectedContent()}
                                          onSubmit={function (_id,_title,_desc) {
                                              var _contents = Array.from(this.state.contents);
                                              for (var i = 0; i < _contents.length; i++){
                                                  if (_contents[i].id === _id) {
                                                      _contents[i] = {id: _id, title: _title, desc: _desc, li: null};
                                                      break;
                                                  }
                                              }
                                              this.setState({contents: _contents, mode: 'read'});
                                          }.bind(this)}>
                </UpdateContent>
            } else {
                article = <h3>artcle을 선택해주세요</h3>;
            }
        }
        return article
    }
    /** [props & state]
     * props 와 state 는 일반 JavaScript 객체입니다. props는 컴포넌트 함수에 전달되는 유일한 인자이다. state는 (함수 내에 선언된 변수처럼) 컴포넌트 안에서 관리됩니다.
     * props 컴포넌트에 설정값을 태그호출시 외부에서 props={ } 형태로 주입, read-only 내부에서 수정불가
     * state 컴포넌트에 설정값을 내부 코드에서 조작, constructor()로 미리 값을 세팅하거나, setState를 통해 동적으로 값 변경
     * 상위(부모) 컴포넌트가 하위(자식) 컴포넌트를 제어할 때 상위 state값을 하위 props로 주입하여 제어
     * 하위(자식) 컴포넌트가 상위(부모) 컴포넌트를 제어할 때 부모가 함수로 setState 선언 자식은 이벤트를통해얻은 인자를 props로 선언된 부모함수의 파라미터로 전달 */
    render() {
        /** render() (class 안에 소속된 함수는 function을 생략해서 표현)
         * 리액트에서는 props, state가 바뀌면 해당되는 컴포넌트의 render함수가 호출되며 화면이 다시 그려진다 */
        console.log('**App render**');
        return ( // return 안에는 하나의 최상위 html 태그를 정의해야한다
            <div className="App_css">
               {/** <Subject title="React" sub="페이스북에서 개발한 자바스크립트 라이브러리"></Subject> props 값을 하드코딩할수도 있음 */}
                <Subject
                    title={this.state.subject.title} // 하위(자식) 컴포넌트의 props에 상위(부모) 컴포넌트의 state값을 주입
                    sub={this.state.subject.sub}
                    onChangePage={function () { // props로 함수를 정의할수도 있음
                        this.setState({ // setState: state를 변경하며 render호출 그냥 변경하면 render가 호출되지 않음
                            mode:'welcome',
                            selected_cnt_id:0
                        });
                    }.bind(this)}
                >
                </Subject>
                <ToC
                    data={this.state.contents}
                    onChangePage={function (id) {
                        this.setState({
                            mode:'read',
                            selected_cnt_id:Number(id),
                        });
                    }.bind(this)}
                >
                </ToC>
                <Control
                    onChangeMode={function (mode) {
                        if (mode === 'delete') {
                            if(this.state.selected_cnt_id !== 0 && window.confirm('really??')) {
                                var _contents = Array.from(this.state.contents);
                                for (var i = 0; i < _contents.length; i++){
                                    if (_contents[i].id === this.state.selected_cnt_id) {
                                        _contents.splice(i,1);
                                        break;
                                    }
                                }
                                this.setState({
                                    mode:'welcome',
                                    contents:_contents,
                                    selected_cnt_id:0
                                });
                            }
                        } else if (mode === 'create') {
                            this.setState({
                                mode:mode,
                                selected_cnt_id:0
                            });
                        } else {
                            this.setState({
                                mode:mode
                            });
                        }
                    }.bind(this)}
                >
                </Control>
                {this.getArticle()} {/* 컴포넌트를 변수로 제어해서 뿌리기*/}
            </div>
        );
    }
}

export default App;

/** redux
 * 컴퍼넌트는 props와 state로 데이터를 주고 받아서 서로 복잡하게 엉켜있음
 * redux 기능을 사용하면 모든 컴퍼넌트가 중앙 데이터에 직접 연결되어 데이터를 주고받음 */