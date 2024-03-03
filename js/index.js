
const loadDiscuss = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await response.json();


    const allPostsContainer = document.getElementById('all-post-container')
    allPostsContainer.classList = "lg:w-[65%] my-14 space-y-8"


    data.posts.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-5 border-2 p-4  rounded-lg bg-[#797DFC1A]">
                        <div class="">
                            <img class="bg-slate-300 p-1 rounded-xl h-16 w-16" src="${item?.image}" alt="">
                        </div>
                        <div class="w-full">
                            <div class="flex gap-4">
                                <h3>#${item.category}</h3>
                                <h3>${item?.author?.name}</h3>

                            </div>
                            <div class="mt-4">
                                <h3 class="text-xl font-bold">10 Kids Unaware of Their Halloween Costumet</h3>
                                <p class="text-p-colors">
                                    ${item?.description}
                                </p>
                            </div>
                            <div class="flex justify-between mt-10">
                                <div class="space-x-3 inline-flex items-baseline">
                                    <i class="fa-regular fa-envelope"></i>
                                    <p>${item?.comment_count}</p>
                                    <i class="fa-regular fa-eye"></i>
                                    <p>${item?.view_count}</p>
                                    <i class="fa-regular fa-clock"></i>
                                    <p>${item?.posted_time}</p>
                                </div>
                                <div>
                                    <img src="images/Group.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
        `

        allPostsContainer.appendChild(div)
        console.log(item)
    });
}


// latest post section

const latestPosts = async (item) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await response.json();

   
    const latestPostsContainer = document.getElementById('latest-posts-container');
    latestPostsContainer.classList = "grid lg:grid-cols-3 gap-4 lg:mt-10"

    data.forEach(item => {

        console.log(item)
        const div = document.createElement("div");
        div.innerHTML = `
        <div class=" bg-[#797DFC1A] p-4 rounded-2xl space-y-4">
                    <div>
                        <img class ="rounded-xl" src="${item?.cover_image}" alt="">
                    </div>
                    <div class="flex">
                        <img src="images/calender.png" alt="">
                        <h4>${item?.author?.posted_date}</h4>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">${item?.title}</h3>
                        <p>${item?.description}</p>
                    </div>
                    <div class ="inline-flex gap-5">
                        <div>
                            <img class = "h-16 w-16 rounded-full"src="${item?.profile_image}" alt="">
                        </div>
                        <div>
                            <h4 class="font-bold">Cameron Williamson</h4>
                            <h5>Unknown</h5>
                        </div>
                    </div>

                </div>
        `

        latestPostsContainer.appendChild(div)
        console.log(item)
    })
}

loadDiscuss()

latestPosts()