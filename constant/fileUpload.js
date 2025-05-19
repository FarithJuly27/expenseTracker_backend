
const fileTypes = [
    {
        name: 'image',
        types: ['jpg', 'jpeg', 'png', 'bmp', 'gif']
    },
    {
        name: 'video',
        types: ['jpg', 'jpeg', 'png', 'bmp', 'gif']
    },
    {
        name: 'pdf',
        types: ['pdf']
    },
    {
        name: 'audio',
        types: [
            "mp3",  // MPEG Audio Layer III - Common format for music and audio
            "wav",  // Waveform Audio File Format - High-quality, uncompressed audio
            "flac", // Free Lossless Audio Codec - Lossless compression for high-quality audio
            "aac",  // Advanced Audio Codec - Used in streaming and Apple devices
            "ogg",  // Ogg Vorbis - Open-source compressed audio format
            "m4a",  // MPEG-4 Audio - Common in Apple devices, supports AAC or ALAC
            "wma",  // Windows Media Audio - Proprietary format by Microsoft
            "alac", // Apple Lossless Audio Codec - Lossless audio format by Apple
            "aiff", // Audio Interchange File Format - High-quality, uncompressed audio
            "pcm",  // Pulse-Code Modulation - Raw audio data used in CDs and recording
            "opus"  // Opus Audio - Modern, highly efficient audio compression format
        ]
    }
]

module.exports = {
    fileTypes
}