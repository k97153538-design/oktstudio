const promptInput = document.querySelector('#prompt-input');
const editNotes = document.querySelector('#edit-notes');
const sourcePreview = document.querySelector('#source-preview');
const editPreview = document.querySelector('#edit-preview');
const resultPreview = document.querySelector('#result-preview');
const styleButtons = [...document.querySelectorAll('.tool-grid button')];

let selectedStyle = '스케치';
let sourceState = null;
let editState = null;

styleButtons.forEach((button, index) => {
  if (index === 0) button.classList.add('active');
  button.addEventListener('click', () => {
    styleButtons.forEach((el) => el.classList.remove('active'));
    button.classList.add('active');
    selectedStyle = button.dataset.style;
  });
});

const format = (title, obj) => {
  const lines = Object.entries(obj).map(([key, value]) => `• ${key}: ${value}`);
  return `${title}\n${lines.join('\n')}`;
};

document.querySelector('#apply-source').addEventListener('click', () => {
  sourceState = {
    프롬프트: promptInput.value.trim() || '입력된 프롬프트 없음',
    스타일: selectedStyle,
    단계: '원본 생성 준비 완료',
  };

  sourcePreview.textContent = format('원본 이미지 설정', sourceState);
});

document.querySelector('#apply-edit').addEventListener('click', () => {
  editState = {
    ControlNet: document.querySelector('#controlnet-model').value,
    강도: document.querySelector('#controlnet-weight').value,
    Denoise: document.querySelector('#denoise').value,
    Seed: document.querySelector('#seed').value,
    편집_프롬프트: editNotes.value.trim() || '입력된 편집 지시 없음',
    단계: 'Stable Diffusion + ControlNet 편집 준비 완료',
  };

  editPreview.textContent = format('편집 설정', editState);
});

document.querySelector('#render-result').addEventListener('click', () => {
  if (!sourceState || !editState) {
    resultPreview.textContent = '먼저 1) 원본 설정 반영과 2) 편집 적용을 실행해 주세요.';
    return;
  }

  const result = {
    최종_스타일: sourceState.스타일,
    원본_프롬프트: sourceState.프롬프트,
    편집_모델: editState.ControlNet,
    편집_강도: editState.강도,
    렌더링_상태: '완성 이미지 생성 완료(프로토타입 시뮬레이션)',
  };

  resultPreview.textContent = format('완성본 미리보기', result);
});

sourcePreview.textContent = '원본 이미지 프롬프트와 기능 버튼을 선택해 주세요.';
editPreview.textContent = 'ControlNet 옵션을 조정하고 편집 적용을 눌러 주세요.';
resultPreview.textContent = '완성본 렌더링 버튼을 누르면 결과가 표시됩니다.';
