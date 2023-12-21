#!/bin/bash
# https://fooy.github.io/posts/ffmpeg-fast-mosaic-preview/
FFMPEG="ffmpeg -nostdin -loglevel error -nostats"
INFILE="$1"

if [ -z "$2" ];then
    OUTFILE="${2:-$1.webp}"
  else
    OUTFILE=$2
fi

[ -z "INFILE" ] && exit 1;

DURATION=$(ffprobe -loglevel error -show_entries format=duration -of default=nw=1:nk=1 "$INFILE")
DURATION=${DURATION%.*}

[[ ! $DURATION =~ ^[0-9]+$ ]] && exit 1

echo "duration is $DURATION s"
COL=4
((NSHOT=$COL*7-1))
SHOTS=(0)
if [ $DURATION -ge $NSHOT ] ;then
    SEG=$(($DURATION/$NSHOT))
    SHOTS=($(seq 0 $SEG $DURATION))
    SHOTS=(${SHOTS[@]:1})

    if [ $SEG -ge 300 ];then
        SHOTS=(5 30 90 180 ${SHOTS[@]})
    elif [ $SEG -ge 150 ];then
        SHOTS=(5 30 60 100 ${SHOTS[@]})
    elif [ $SEG -ge 60 ];then
        SHOTS=(5 10 20 40 ${SHOTS[@]})
    fi
fi
echo "Screenshots: ${SHOTS[@]}"

SCALE=3840:-1
PADS=([{a..z}] [{A..Z}])
NFRAME=${#SHOTS[@]}

OPT_SEEK=""
OPT_FILTER=""
i=0
for t in ${SHOTS[@]} ;do
    OPT_SEEK="${OPT_SEEK} -ss $t -i '$INFILE'"
    OPT_FILTER="${OPT_FILTER}[$i:v]trim=start_frame=1:end_frame=2${PADS[$i]};"
    i=$((++i))
done
OPT_FILTER="${OPT_FILTER}${PADS[@]:0:$i}concat=n=$i,tile=${COL}x$(($NFRAME/$COL+(($NFRAME%$COL)!=0))),scale=$SCALE"

eval "$FFMPEG $OPT_SEEK -filter_complex '$OPT_FILTER' -y '$OUTFILE'"
