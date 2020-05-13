# 🥁 Drum it up!

![Drum it up](./img/Readme.png)

## About

keydown 및 click을 통해서 드럼 연주를 할 수 있다.

지정한 템포에 맞춰 클릭한 input에 해당하는 audio를 연속 재생할 수 있다.

## Trouble Shooting

### clearInterval Issue

❓setInterval 함수의 큐에 등록된 함수가 clearInterval을 했음에도 실행됨

❗️`isPause` 플래그를 통해 해결

## Update

- 재생 중인 영역 시각화
- reset 버튼 추가
