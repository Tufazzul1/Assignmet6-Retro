
const loadDiscuss = async () =>{
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await response.json();


    const allPostsContainer = document.getElementById('all-post-container')
    allPostsContainer.classList = "lg:w-[65%] my-14 space-y-8"


    data.posts.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-5 border-2 p-4  rounded-lg bg-[#797DFC1A]">
                        <div class="">
                            <img class="bg-slate-300 p-4 rounded-full" src="images/Frame (2).png" alt="">
                        </div>
                        <div class="">
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
                            <div class="flex justify-between mt-10 bg-red-400">
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

loadDiscuss()