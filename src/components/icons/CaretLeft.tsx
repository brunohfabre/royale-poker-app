import { Path, Svg } from 'react-native-svg'

export function CaretLeft() {
  return (
    <Svg width={24} height={24} fill="none">
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15 18-6-6 6-6"
      />
    </Svg>
  )
}
