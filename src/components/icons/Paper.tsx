import { Path, Svg } from 'react-native-svg'

export function Paper() {
  return (
    <Svg width={18} height={18} fill="none">
      <Path
        stroke="#ADADAD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.5 1.5h-6A1.5 1.5 0 0 0 3 3v12a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 15 15V6l-4.5-4.5Z"
      />
      <Path
        stroke="#ADADAD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.5 1.5V6H15M12 9.75H6M12 12.75H6M7.5 6.75H6"
      />
    </Svg>
  )
}
