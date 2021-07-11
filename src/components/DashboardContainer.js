import { connect } from "react-redux";
import { addTokenCreator } from "../redux/commonReducer";
import {withRouter} from "react-router-dom";


import Dashboard from "./Dashboard";

const mapStateToProps = (state) => {
    console.log(state);
    return {
        commonReducer: state.commonState
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

        addToken: (value) => {
            //console.log(`addPhoneNumberCreator - value ${value}`);
            dispatch(addTokenCreator( value ) );
        }

    }
}

let DashboardWithRouter = withRouter( Dashboard );


const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardWithRouter);

export default DashboardContainer;