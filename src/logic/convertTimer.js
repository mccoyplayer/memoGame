export default function convertToTimer(miliseconds){

    let allSeconds = miliseconds / 1000
    let minutes = Math.trunc(allSeconds / 60)
    let seconds = allSeconds - (minutes * 60)

    return minutes.toString().padStart(2, '0') +':'+seconds.toString().padStart(2, '0')
}
