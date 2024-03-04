
const allPostLoad = async (catId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${catId}`);
    const data = await response.json();

    const allPostsContainer = document.getElementById('all-post-container')
    allPostsContainer.textContent = '';
    allPostsContainer.classList = "lg:w-[65%] my-14 space-y-8"
    // hide the spinner 
    setTimeout(() => {
        data.posts.forEach(item => {
            let isActive = null;
            const div = document.createElement("div");
            console.log(item)
            div.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-5 border-2 p-4  rounded-lg bg-[#797DFC1A]">
                        <div class="relative">
                            <img class="bg-slate-300 p-1 rounded-xl h-16 w-16 relative" src="${item?.image}" alt="">
                            <div class ="absolute -top-0 -right-0 h-[15px] w-[15px] rounded-full ${item?.isActive ? 'bg-green-700' : 'bg-red-700'}">
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="flex gap-4">
                                <h3><span>${item.id}</span> ${item.category}</h3>
                                <h3> Authore : ${item?.author?.name}</h3>

                            </div>
                            <div class="mt-4">
                                <h3 class="text-xl font-bold">${item?.title}</h3>
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
                                <div  onclick="setReadValue('${item.title}', ${item?.view_count})" id ="mark-read" class ="all-Btn">
                                    <button onclick = "setReadCount()"><img src="images/Group.png" alt=""></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
            allPostsContainer.appendChild(div);

        })

        toggleLoadingSpinner(false)
    }, 2000);
}

const loadDiscuss = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await response.json();


    const allPostsContainer = document.getElementById('all-post-container')
    allPostsContainer.textContent = '';
    allPostsContainer.classList = "lg:w-[65%] my-14 space-y-8"
    // hide the spinner 
    setTimeout(() => {
        data.posts.forEach(item => {
            let isActive = null;
            const div = document.createElement("div");
            // console.log(item)
            div.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-5 border-2 p-4  rounded-lg bg-[#797DFC1A]">
                        <div class="relative">
                            <img class="bg-slate-300 p-1 rounded-xl h-16 w-16 relative" src="${item?.image}" alt="">
                            <div class ="absolute -top-0 -right-0 h-[15px] w-[15px] rounded-full ${item?.isActive ? 'bg-green-700' : 'bg-red-700'}">
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="flex gap-4">
                                <h3><span>${item.id}</span> ${item.category}</h3>
                                <h3> Authore : ${item?.author?.name}</h3>

                            </div>
                            <div class="mt-4">
                                <h3 class="text-xl font-bold">${item?.title}</h3>
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
                                <div  onclick="setReadValue('${item.title.replace(/'/g,'@')}', ${item?.view_count})" id ="mark-read" class ="all-Btn">
                                    <button onclick = "setReadCount()"><img src="images/Group.png" alt=""></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
            allPostsContainer.appendChild(div);
        })

        toggleLoadingSpinner(false)
    }, 2000);
}


// latest post section
const latestPosts = async (item) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await response.json();


    const latestPostsContainer = document.getElementById('latest-posts-container');
    latestPostsContainer.classList = "grid lg:grid-cols-3 gap-4 lg:mt-10"

    data.forEach(item => {

        // console.log(item)
        const div = document.createElement("div");
        div.innerHTML = `
        <div class=" bg-[#797DFC1A] p-4 rounded-2xl space-y-4">
                    <div>
                        <img class ="rounded-xl" src="${item?.cover_image}" alt="">
                    </div>
                    <div class="flex">
                        <img src="images/calender.png" alt="">
                        <h4>${item?.author?.posted_date || 'No publish date'}</h4>
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
                            <h4 class="font-bold">${item?.author?.name}</h4>
                            <h5>${item?.author?.designation || 'Unknown'}</h5>
                        </div>
                    </div>

                </div>
        `
        latestPostsContainer.appendChild(div)

    })
}


// search
const handleSearch = () => {
    const value = document.getElementById('search-box').value;
    toggleLoadingSpinner(true);
    if (value) {
        allPostLoad(value)
    }
    else {
        alert('Plesee enter a valid catergory')
    }

}


// spinner 
const toggleLoadingSpinner = (isLoading) => {

    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }

}



function setReadValue(title, view) {

    const appendId = document.getElementById("append-id");
    const div = document.createElement('div');
    div.classList = " my-6 bg-[#797DFC1A] p-1 rounded-xl";

    div.innerHTML =`
    <div id="add-title" class=" bg-white inline-flex items-baseline p-2 justify-between w-full"> 
    <div class="w-[70%]">
        <h4 class="font-bold">${title.replace('@',"'")}</h4>
    </div>
    <div class="w-[30%] inline-flex items-baseline">    
        <i class="fa-regular fa-eye"></i>
        <h4>${view}</h4>
    </div>

</div> 
    `

    appendId.appendChild(div);
    // console.log('clicked')
}



let markReadCount = 0;

function setReadCount() {
    const element = document.getElementById('mark-read-count');
    markReadCount++;
    element.innerHTML = markReadCount;
}



allPostLoad()
loadDiscuss()
latestPosts()