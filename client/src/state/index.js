import { createSlice } from "@reduxjs/toolkit";

// this state will be the state that is stored in global state 
// this data is accessible through entire application
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
}


// we dont have to create action createslice automatically create actions
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },

        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            }
            else {
                console.error("User friends non-existent :( ")
            }
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },

        // logic of setPost
        // here i am going through the list of the post to try to find the post that we just updated and 
        // if so we are just gonna replace it by doing action.payload.post
        // otherwise we just return the original post if we did not find it  

        // we are returning the updated post that we changed and its coming from the backend we are going to select that particular post everything else we leave
        setPost: (state, action) => {
            //grabbing our list of posts and map through each one
            const updatedPosts = state.posts.map((post) => {
                // if post._id is equal with the current post id that we sending into this function
                // then we return the post that we want (so we only gonna return the relevant post)
                // other wise we return what we currently have
                if (post._id === action.payload.post._id) return action.payload.post
                return post
            });
            state.posts = updatedPosts
        }
    }
})


// exporting the actions
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;

// exporting the reducers
export default authSlice.reducer;