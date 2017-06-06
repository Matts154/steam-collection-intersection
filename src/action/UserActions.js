import { dispatcher } from "../dispatcher.js";
import Constants from "../constant/Constants";

export function changePrimaryUser(steamName){
	dispatcher.dispatch({
		type: Constants.user.change,
		steamName
	});
};
