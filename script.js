let a;

class Level extends React.Component {
    chooseLev(b) {
        a = b;
        document.querySelector('.btn__select').style.display = 'none';
        document.querySelector('.content').style.display = 'block';
        ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
    }
}

class App extends Level {
    constructor() {
        super();
        this.compareUserInput = this.compareUserInput.bind(this);
        this.randomGenerate = this.randomGenerate.bind(this);
        this.resetState = this.resetState.bind(this);
        this.state = {
            question: btoa(this.randomGenerate(2)),
            level: {main: 1, sub: 1},
            wrong: 0
        };
    }

    resetState() {
        this.setState({
            question: btoa(this.randomGenerate(2)),
            level: {main: 1, sub: 1},
            wrong: 0
        });

    }

    randomGenerate(digit) {
        let max = Math.pow(10, digit) - 1,
            min = Math.pow(10, digit - 1);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    compareUserInput(usernumberInput) {
        let currQuestion = this.state.question,
            mainLevel = this.state.level.main,
            subLevel = this.state.level.sub,
            wrong = this.state.wrong,
            digit;

        if (usernumberInput === currQuestion) {
            if (subLevel < 3) {
                ++subLevel;
            } else if (subLevel === 3) {
                ++mainLevel;
                subLevel = 1;
            }
        } else {
            ++wrong;
        }
        digit = mainLevel + 2;

        this.setState({
            question: btoa(this.randomGenerate(digit)),
            level: {main: mainLevel, sub: subLevel},
            wrong: wrong
        });
//		console.log( this.state.level)

    }

    render() {
        return /*#__PURE__*/(
            React.createElement("div", {className: "main__app"}, /*#__PURE__*/
                React.createElement(GenNumberInput, {
                    question: this.state.question,
                    level: this.state.level,
                    wrong: this.state.wrong
                }), /*#__PURE__*/
                React.createElement(InputnumberInput, {
                    compareUserInput: this.compareUserInput,
                    wrong: this.state.wrong,
                    onReset: this.resetState
                })));

    }
}

class GenNumberInput extends App {

    componentDidUpdate() {

        let time, digit;


            digit = this.props.level.main + 2;


        time = (110 * Math.min(digit, 5) + 400 * Math.max(digit - 5, 0)) * a;

        let numberInput = document.getElementById('numberInput');
        setTimeout(function () {
            numberInput.innerHTML = numberInput.innerHTML.replace(/\w/gi, '&#183;');
        }, time);
    }

    componentDidMount() {
        let numberInput = document.getElementById('numberInput');
        setTimeout(function () {
            numberInput.innerHTML = numberInput.innerHTML.replace(/\w|\W/gi, '&#183;');
        }, 1200);
    }

    render() {
        return /*#__PURE__*/(
            React.createElement("div", {className: "app__gen-numberInput"}, /*#__PURE__*/
                React.createElement("div", {className: "app__info"}, /*#__PURE__*/
                    React.createElement("p", {className: "app__level"}, "Уровень: ", this.props.level.main, " - ", this.props.level.sub), /*#__PURE__*/
                    React.createElement("p", {className: "app__wrong"}, "Ошибки: ", this.props.wrong, "/3")), /*#__PURE__*/
                /*#__PURE__*/
                React.createElement("p", {
                    className: "app__numberInput",
                    id: "numberInput"
                }, this.props.wrong < 3 ? atob(this.props.question) : '????'), /*#__PURE__*/
            ));


    }
}


class InputnumberInput extends App {
    constructor() {
        super();
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleReset = this.handleReset.bind(this);

    }

    handleUserInput(e) {
        e.preventDefault();
        let usernumberInput = btoa(this.usernumberInput.value);
        this.usernumberInput.value = "";
        this.props.compareUserInput(usernumberInput);
    }

    handleReset() {
        this.props.onReset();
    }

    render() {
        let layout;
        if (this.props.wrong < 3) {
            layout = /*#__PURE__*/React.createElement("div", {className: "app__input"}, /*#__PURE__*/
                React.createElement("form", {onSubmit: this.handleUserInput}, "Введите число:", /*#__PURE__*/

                    React.createElement("input", {
                        pattern: "[0-9]+",
                        type: "numberInput",
                        ref: ref => this.usernumberInput = ref,
                        required: true,
                        autoFocus: true
                    }), /*#__PURE__*/
                    React.createElement("br", null), /*#__PURE__*/
                    React.createElement("br", null)), /*#__PURE__*/

                React.createElement("button", {onClick: this.handleReset}, "Повторить"));

        } else {
            layout = /*#__PURE__*/React.createElement("div", {className: "app__end"}, /*#__PURE__*/
                React.createElement("div", {class: "app__notify"}, "Вы проиграли"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {onClick: this.handleReset}, "Повторить"));
        }

        return layout;
    }
}


var lev = new Level();