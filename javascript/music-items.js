
export const music_post = [];

const audio = ['../music/Dont_want_to_fight.mp3'
                ,'../music/No_war.mp3'
                ,'../music/Sometimes.mp3'
];

const images = ['../image/pexels-eric-esma-302047-894156.jpg'
                ,'../image/pexels-padrinan-167092.jpg'
                ,'../image/pexels-pixabay-257904.jpg'
];

const artist = 'Hasie Harrison';

const titles = [`Don't Want To Fight`,
                `No War`,
                `Sometimes`
]

const lyricsArray = [`intro
Cant take this fight no more oh no
A don't really want to fight eh eh eh eh eh yeh
baby not tonight
a don't really want to fight anymore girl
no not tonight
verse
Am coming in from work yea yea
but you don't believe a word I say
you think that i, coming from
another woman world
chorus
but I don't really want to fight
baby not tonight
a don't really want to fight any longer
no not tonight
Verse.
It would be better if you did yeh yeh
great me with a kiss, girl
and ask me how was my day, was everything ok
Chorus
But all you wanna do is fight
eh eh eh eh eh eh baby not tonight
A don't really want to fight an more girl
Cant take this fight no more oh no
cant take it anymore
Verse
If you want something to do girl
something that's good for you
Let your hair down get loose
Let me make sweet love to you
Chorus
cause I don't really wanna fight
A don't really want to fight any longer
no not tonight
Cant take this fight no more oh no.
cant take it anymore
What's the use in, hanging on to me, if you don't trust me
A don't really wanna fight anymore girl no not tonight
cant take this fight no more`,
`here should be where no war lyrics should be`,
`Intro
Woman I love you yes I do, anything for you
Verse
when I think of the things that are so wonderful
so beautiful to me
when I think of the world that surrounds me
and the beautiful women within
they sometime let me feel like I wanna do something
more than good to you
guess if I could sure i would
to prove that i believe in you
Chorus
Sometimes i feel like i want to reach out break through
take your heart away in turn replace it with mine
love it is true truly i believe in you oh girl
Verse
i guess every man sometimes wish
that somewhere in their life
an angel will come to grant his wish
let him know what happiness is
I dont need no one to grant me that wish
for shes right here with me
given that that i must
an i love the way it makes me feel
no booze, cocaine
no da gone thing
will ever change or bring you pain
love it is true
truly i do believe in you
Bridge
your love is like a quick sand
i would gladly sink into you
with no fear or wanting to know
what would happen to me
for my love you are my reason
why am happy today
and i would do anything to keep it that way
Chorus
sometimes i feel like i want to
reach out and breakthrough
take your heart away
in turn replace it with mine
love it is true
truly i do believe in you`]



// //parse the file content
// const songs = rawLyrics.split('---').filter(song => song.trim());
// const lyricsArray = songs.map(song =>{
//   const [title, ...lines] = song.trim().split('\n');
//   return{
//     title: title.trim(),
//     lyrics:lines.join('\n').trim()
//   };
// });

console.log(lyricsArray);



for(let i = 0; i < audio.length; i++){
music_post.push({
  id: i,
  title: titles[i % audio.length],
  artist: artist,
  lyric: lyricsArray[i %audio.length],
  image: images[i % audio.length],
  audio: audio[i % audio.length]
});
}

console.log(music_post);
