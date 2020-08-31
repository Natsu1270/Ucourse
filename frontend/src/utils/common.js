import React from 'react'

import { Tag } from 'antd'

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


export const renderStatus = (status) => {
  if (status === 'on_going') return <Tag color="purple"><span className="text--sub__bigger">Trong tiến trình</span></Tag>
  if (status === 'fail') return <Tag color="red"><span className="text--sub__bigger">Chưa đạt tiêu chuẩn</span></Tag>
  return <Tag color="blue"><span className="text--sub__bigger">Đạt</span></Tag>
}

export const renderSummary = (isSum) => {
  if (!isSum) return <Tag color="red"><span className="text--sub__bigger">Chưa được tông kết</span></Tag>
  return <Tag color="blue"><span className="text--sub__bigger">Đã tổng kết lớp</span></Tag>
}

export const renderCer = (isCer) => {
  if (!isCer) return <Tag color="red"><span className="text--sub__bigger">Chưa được cấp</span></Tag>
  return <Tag color="blue"><span className="text--sub__bigger">Đã được cấp</span></Tag>
}


export const renderRank = (rank) => {
  if (rank === null) return <Tag color="red"><span className="text--sub__bigger">Chưa phân loại</span></Tag>
  if (rank === 'bad') return <Tag color="magenta"><span className="text--sub__bigger">Yếu</span></Tag>
  if (rank === 'medium') return <Tag color="purple"><span className="text--sub__bigger">Trung bình</span></Tag>
  if (rank === 'good') return <Tag color="green"><span className="text--sub__bigger">Khá</span></Tag>
  return <Tag color="blue"><span className="text--sub__bigger">Xuất sắc</span></Tag>
}