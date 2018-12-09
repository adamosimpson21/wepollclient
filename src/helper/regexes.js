export function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function isLink(string){
  const linkRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
  return !!string.match(linkRegex)
}

export function formatUrlToEmbed(url){
  if(typeof url !=='string' && isLink(url)) {
    return 'Not a valid Link'
  }
  if(url.includes('youtube.com/watch?v=')){
    return url.replace('watch?v=', 'embed/')
  } else if(url.includes('youtube.com/embed?v=')){
    return url.replace('embed?v=', 'embed/')
  } else if(url.includes('vimeo.com')){
    return url.replace('vimeo.com', 'player.vimeo.com')
  } else {
    return url;
  }
}