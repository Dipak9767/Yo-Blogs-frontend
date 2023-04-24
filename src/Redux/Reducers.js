
const userState = JSON.parse(localStorage.getItem('bloguser'))?JSON.parse(localStorage.getItem('bloguser'))
                : {
                    isAuth:false,
                    userInfo:{}
                  }


export const userReducer = (state = userState , action)=>{
    switch(action.type){
        case "LOGIN" : return{
           ...action.payload
        }
        case "LOGOUT" : return{
            isAuth:false,
            userInfo:{ }
        }
        default:return{
            ...state
        }
    }
}