/**
 * Created by Monyk on 30.12.2016.
 */

export default {
    state: {
        user: null,
        subscriptions: [],
        posts: [],
        bans: [],
        search: ''
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        loadSubscriptionsAndBans(state){
            $.get(`/user/${state.user.id}/subscriptions`, (res) => {
                if(res.success)
                {
                    state.subscriptions = res.subscriptions
                    state.bans = res.bans
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
        },
        loadPostsWithFilter(state, filter){
            $.post('/post/filter', filter, (res) => {
                if(res.success)
                {
                    state.posts = res.posts
                }
            })
        },
        updateSearch(state, newSearch)
        {
            state.search = newSearch
        }
    },
    getters: {
        getFoundPosts(state){
            let posts = state.search ? state.posts.filter((post) => {
                    let isFine = false
                    post.Tags.forEach(tag => {
                        if(tag.name.includes(state.search))
                        {
                            isFine = true
                        }
                    })
                    if(post.content.includes(state.search))
                        isFine = true
                    return isFine
                }) : state.posts
            return posts
        }
    }
}