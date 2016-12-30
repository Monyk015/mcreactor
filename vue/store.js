/**
 * Created by Monyk on 30.12.2016.
 */

export default {
    state: {
        user: null,
        subscriptions: [],
        posts: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        loadSubscriptions(state){
            $.get(`/user/${state.user.id}/subscriptions`, (res) => {
                if(res.success)
                {
                    state.subscriptions = res.subscriptions
                }
                else
                {
                    console.log('Something went wrong')
                }
            })
        },
        loadPosts(state, path){
            if(path == "/")
                path = 'post'
            $.get(path, (posts) => {
                state.posts = posts
                console.log(state.posts)
            })
        }
    }
}