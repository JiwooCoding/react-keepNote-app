const getStandardName = (name: string) => {
    return(
        //name이 있으면 (0번째 index에서 ,1개)를 대문자 + name이 있으면 (1번째 index에서 ,name길이만큼) 소문자
        name?.slice(0,1).toUpperCase() + name?.slice(1, name.length).toLocaleLowerCase()
    )
}

export default getStandardName