export const apiUrls = {
    randomDogs:"breeds/image/random/"
}

export const pages = {
    home:'home',
    breeds:'breeds',
    breed:'breed',
    subBreed: 'subBreed',
    notExistent:'notExistent'
}

export const initState = { pageUrl: pages.home, apiUrl:apiUrls.randomDogs + '9' };