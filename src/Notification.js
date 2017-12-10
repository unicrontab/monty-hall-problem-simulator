import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';


const fade = keyframes`
    0% {
        transform: translateY(0px);
    }
    1%{
        opacity: 1;
        visibility: visible;
    }
    100% {
        transform: translateY(-100px);
        opacity: 0;
        visibility: hidden;
    }
`;

const NotificationText = styled.span`
    color: rgba(70, 170, 0, 1);
    font-weight: 900;
    font-size: calc(2rem);
    position: absolute;
    top: 22%;
    animation: ${fade} 1s linear forwards;
`;


const SwitchWin = styled(NotificationText)`
    right: 33%;
`;

const SwitchLost = styled(NotificationText)`
    right: 66%;
`;

const NotificationWrapper = ({ won, switchWin, switchLost }) => {
    if (won === true) return <SwitchWin>+{switchWin}</SwitchWin>;
    if (won === false) return <SwitchLost>-{switchLost}</SwitchLost>;
    if (!won) return null;
};

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
    }

    componentDidMount = () => {
        this.timeoutId = setTimeout(() => {
            this.setState({ show: false });
        }, 2000);
    }

    componentWillUnmount = () => {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    render() {
        if (!this.state.show) return null;
        return (this.state.show &&
            <NotificationWrapper
                won={this.props.won}
                switchWin={this.props.switchWin}
                switchLost={this.props.switchLost}
            />
        );
    }
}

export default Notification;
