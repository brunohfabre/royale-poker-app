import { Path, Svg } from 'react-native-svg'

export function Book() {
  return (
    <Svg width={18} height={18} fill="none">
      <Path
        stroke="#ADADAD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 14.625a1.875 1.875 0 0 1 1.875-1.875H15"
      />
      <Path
        stroke="#ADADAD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.875 1.5H15v15H4.875A1.875 1.875 0 0 1 3 14.625V3.375A1.875 1.875 0 0 1 4.875 1.5Z"
      />
    </Svg>
  )
}
