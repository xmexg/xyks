import { IExamVO, IExerciseQuestionVO, IOralPkExerciseVO, IOralPkResultVO } from '@/types/exercise/exercise'
import request from '@/services/request'
import { encryptRequestBody } from '@/utils/EncryptData'

export default class ExerciseService {
  static getPkExerciseQuestion (pointId: string): Promise<IOralPkExerciseVO> {
    return request.post(`/leo-game-pk/{client}/math/pk/match?pointId=${pointId}`, null).then(res => res.data)
  }

  static postPkExerciseResult (exerciseData: any): Promise<IOralPkResultVO> {
    return encryptRequestBody(exerciseData).then(encryptedData => {
      return request.put('/leo-game-pk/{client}/math/pk/submit', encryptedData, {
        headers: { 'content-type': 'application/octet-stream' }
      }).then(res => res.data)
    })
  }

  static getPkExerciseResult (pkIdStr: string): Promise<IExamVO> {
    return request.get(`/leo-game-pk/{client}/math/pk/history/detail?pkIdStr=${pkIdStr}`).then(res => res.data)
  }
}
