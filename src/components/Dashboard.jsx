import React from 'react';
import { NavLink } from 'react-router-dom';

import * as axios from "axios";




class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        console.log(this.props);
        // console.log(baseURL);
    }
    componentDidMount() {
        //this.props.stepLoginChange('step1');
        //this.checkUser();
        this.rr();
    }
    rr = () => {
        axios.post(`${this.props.commonReducer.baseUrl}/api/v1/session/applogin`, {"title": `foo`})
            .then((response) => {
                console.log(response.data);
                console.log(response.data.success);
                this.props.au_addToken(response.data.token); //записуєм token в store
                this.setState({ loading: false });
            })
            .catch((error) => {
                console.log(error.response);
                console.log('error_catch');

            });
    }

    checkUser = () => {
        console.log(this.props);
        console.log(this.props.mainState.authorization.userData.isSendSms);
        if(this.props.mainState.authorization.userData.isSendSms){
            this.props.stepLoginChange('step2');
            this.setState({ loading: false });
            console.log('stepLoginChange(step2)');
        }else{
            let cookiesPhone = this.getCookie('seller_phone');
            if(cookiesPhone){
                console.log(cookiesPhone);
                axios.post(`${this.props.mainState.baseUrl}/api/v1/session/applogin`, {"phone": `${cookiesPhone}`})
                    .then((response) => {
                        console.log(response.data);
                        console.log(response.data.success);
                        this.props.au_addToken(response.data.token); //записуєм token в store
                        this.props.au_addSellerId(response.data.seller_id);
                        this.props.au_addPhoneNumber(response.data.phone);
                        console.log(response.data.success);
                        if (response.data.success === 1) {
                            console.log(response.data.success);

                            let numberStatus = response.data.status;
                            let status = () => {
                                console.log(numberStatus);
                                switch (numberStatus) {
                                    case '0' :
                                        return 'step2'
                                    case '1' :
                                        return 'step3'
                                    case '2' :
                                        return 'step4'
                                    case '3' :
                                        return 'step5'
                                    case '4' :
                                        return 'profile' // тут потрібно вставити метод який викине юзера до кабінету
                                    default:
                                        return null;
                                }
                            };
                            console.log(status());
                            // if(status() == 'step2'){
                            //     this.props.state.au_changeStep(status());
                            // }else
                            if (status() == 'step4' || status() == 'step3') {
                                this.props.history.push('/singup');
                                this.props.au_changeClass('secondStep_Active');
                                this.props.au_changeStep(status());
                            } else if (status() == 'step5') {
                                this.props.history.push('/singup');
                                this.props.au_changeClass('thirdStep_Active');
                                this.props.au_changeStep(status());
                            } else if (status() == 'profile') {
                                this.props.history.push('/profile');
                            }
                            this.setState({ loading: false });

                        } else if (response.data.success === 0) {
                            console.log(response.data.success);
                            console.log(response.data.token);
                            this.setState({loading: false});
                            this.props.isSendSms(true);
                            this.props.stepLoginChange('step2');
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        console.log('error_catch');

                        if (error.response.status == 500 || error.response.status == undefined) { // ПОТРІБОН ПЕРЕРОБИТЬ ПОПАП
                            this.props.showPopupError(true, 0); // Помилка сервера
                        } else {
                            this.props.showPopupError(true, error.response.data.errorCode);
                        }
                    });

            }else{
                this.setState({ loading: false });
                this.props.stepLoginChange('step1');
            }
        }

    }


    render() {
        return (
            <div className="dashboard">
                {
                    this.state.loading
                        ? <div className="loading">
                            <div className="rotating">
                                <svg viewBox="0 0 512 512">
                                    <path
                                        d="m244.36 372.36c-12.853 0-23.273 10.42-23.273 23.273v93.091c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273v-93.091c-1e-3 -12.853-10.421-23.273-23.273-23.273z"
                                        fill="#2D50A7"/>
                                    <path
                                        d="m244.36 0c-12.853 0-23.273 10.42-23.273 23.273v93.091c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273v-93.091c-1e-3 -12.853-10.421-23.273-23.273-23.273z"
                                        fill="#73A1FB"/>
                                    <path
                                        d="m359.56 338.28c-9.087-9.089-23.824-9.089-32.912 0-9.089 9.087-9.089 23.824 0 32.912l65.826 65.826c4.544 4.544 10.499 6.816 16.455 6.816s11.913-2.271 16.457-6.816c9.089-9.089 9.089-23.824 0-32.912l-65.826-65.826z"
                                        fill="#355EC9"/>
                                    <g fill="#C4D9FD">
                                        <path
                                            d="m81.455 232.73h-46.546c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h46.545c12.853 0 23.273-10.42 23.273-23.273s-10.42-23.273-23.272-23.273z"/>
                                        <path
                                            d="m96.256 74.982c-9.087-9.089-23.824-9.089-32.912 0s-9.089 23.825 0 32.912l65.826 65.825c4.544 4.544 10.501 6.817 16.455 6.817 5.956 0 11.913-2.273 16.455-6.817 9.089-9.089 9.089-23.824 0-32.912l-65.824-65.825z"/>
                                    </g>
                                    <path
                                        d="m477.09 232.73h-93.091c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h93.091c12.853 0 23.273-10.42 23.273-23.273s-10.42-23.273-23.273-23.273z"
                                        fill="#3D6DEB"/>
                                    <path
                                        d="m392.47 74.982-65.826 65.825c-9.089 9.087-9.089 23.824 0 32.912 4.544 4.544 10.501 6.817 16.455 6.817 5.955 0 11.913-2.273 16.457-6.817l65.826-65.825c9.089-9.087 9.089-23.824 0-32.912-9.087-9.089-23.823-9.089-32.912 0z"
                                        fill="#5286FA"/>
                                </svg>
                            </div>
                        </div>
                        : <>
                            <h1>Dashboard</h1>
                        </>
                }
            </div>
        )
    }
}

export default Dashboard;