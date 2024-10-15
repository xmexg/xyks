# 只适配了比大小口算pk, 其他未测试
from answer import Student
import concurrent.futures
import time

# 如何读取cookie: 0:读取cookies_model, 1:通过hook读取(还未实现)
cookie_type = 1

"""
请填写cookie
(可能)只需要填下面3个关键cookie即可
ks_persistent, sess, userid
"""
cookies = {
    "YFD_U": "-3211421434165909800",
    "__sub_user_infos__": "/24T7Ovgtuud9LSYuz4IE8QXC8WtncTejJIS1NgUsGUc8dJri87nwxAR7ZYZSGLMzASpBTOcRDDcGj5XRSh1wQ==",
    "g_loc": "vPeteFfrRL2jJ0VNIL3TWQ==",
    "g_sess": "mNlruvzVSah744XpRWZwrJnSf85irHQXWZNUGSn27yzqcVC4X47xgec3wZzaHdpycmhggh4Nc/ETKNNMvV6z+l9HmLXdNf7tLzzWJYrgsC55vyiiufCCQNT8ynqqTJPG",
    "ks_deviceid": "264747485",
    "ks_persistent": "E7HkOGfEedeolQpPvUgvctiPZ1hsCdgCrWumlSnrg10fRR9HYdofd0CBlxMTQcI8J7tQGTZoCoUi1nDWMDPuw7GN5JOGpwpJ+6HADJ+6BeY=",
    "ks_sess": "+aI8wF/5r4paFMXzig5QgEPWtR3TDnSVQ2eV1eGhImwT/41ip5vnvURH8V1LdJxz",
    "persistent": "EPLFTB7BUdycG28sjEfjTHAPCWlrbTYUyPUdrydyp42z3wiXT9eIussNNc+8BoWua49Wf+i8fY2M/nXqZLBd6w==",
    "sess": "mNlruvzVSah744XpRWZwrJnSf85irHQXWZNUGSn27yzqcVC4X47xgec3wZzaHdpycmhggh4Nc/ETKNNMvV6z+mAQCs8XGPVbybOXWsQ6NLc=",
    "sid": "4442320405456624390",
    "userid": "1052996838"
}

"""
此处填写获取试题答案和提交答案的url, 要带上参数, 每个人的YFD_U和version不一样, 但不会改变, 请自行抓包获取
注意把sign值替换成{sign}, 用于后续填充
"""
url = {
    "get_question": "https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/match/v2?pointId=2&_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign={sign}&deviceCategory=pad",
    "submit_answer": "https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/submit?_productId=611&platform=android32&version=3.93.2&vendor=xiao_mi&av=5&sign={sign}&deviceCategory=pad"
}

# cookie = hookcookie if cookie_type else cookies

"""
hook脚本位置, 保持默认的话, 请不要修改
"""
hook_script = {
    "jsFilePath_getSign": "hook/js/gan_sign_model.js",
    "jsFilePath_doMatchV2ByDataDecryptCommand": "hook/js/do_matchV2_byDataDecryptCommand_model.js",
    "jsFilePath_doAnswerEncrypt": "hook/js/do_answer_encrypt_model.js"
}

print(hook_script["jsFilePath_getSign"])

"""
单次测试执行
"""
# student = Student(cookies, url, "com.fenbi.android.leo", hook_script)
# student.answer()


# 封装执行逻辑的函数
def execute_student_task(cookies, url, hook_script):
    try:
        student = Student(cookies, url, "com.fenbi.android.leo", hook_script)
        student.answer()
    except Exception as e:
        print(f"Error occurred: {e}")


# 创建30个进程池，每个进程池不断执行任务
def run_student_tasks(cookies, url, hook_script, num_processes=30, timeout=5):
    with concurrent.futures.ProcessPoolExecutor(max_workers=num_processes) as executor:
        while True:
            # 提交任务到进程池中
            futures = [executor.submit(execute_student_task, cookies, url, hook_script) for _ in range(num_processes)]

            # 监控每个任务的状态
            for future in concurrent.futures.as_completed(futures, timeout=timeout):
                try:
                    # 尝试获取任务结果，设置超时时间
                    future.result(timeout=timeout)
                except concurrent.futures.TimeoutError:
                    print(f"Task timeout after {timeout} seconds.")
                except Exception as e:
                    print(f"Task failed with error: {e}")
                finally:
                    # 在任务完成、出错或者超时后，继续重新提交任务
                    futures.append(executor.submit(execute_student_task, cookies, url, hook_script))


if __name__ == '__main__':
    # 开始运行任务
    run_student_tasks(cookies, url, hook_script)
