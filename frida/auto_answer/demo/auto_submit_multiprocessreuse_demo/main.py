# 只适配了比大小口算pk, 其他未测试
import argparse
import concurrent.futures
import time

# 用于序列化_frida.Bus对象
from pathos.multiprocessing import ProcessingPool as Pool

from answer import Student

"""
使用多少进程, 数值太高会卡
"""
set_processes = 20

"""
存放一些答题脚本的启动参数
"""
myarg = {

    """
    默认试题倍数, 
    比如默认为1, 收到10道题, 提交10道题
    修改成20, 收到10道题, 提交200道题
    可通过启动参数python main.py --fakeq=20进行修改
    """
    "q_magn": 1
}

"""
通过 python main.py 启动时需要自己填写cookie和url
通过 python main.py --hookcookie 启动时会自动获取cookie和url
"""

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

"""
hook脚本位置, 保持默认的话, 请不要修改
"""
hook_script = {
    "jsFilePath_getSign": "hook/js/gan_sign_model.js",
    "jsFilePath_doMatchV2ByDataDecryptCommand": "hook/js/do_matchV2_byDataDecryptCommand_model.js",
    "jsFilePath_doAnswerEncrypt": "hook/js/do_answer_encrypt_model.js"
}


"""
默认情况下, _frida.Bus 对象不能被序列化, 要使用pathos.multiprocesssing.ProcessingPool来序列化_frida.Bus对象
参考 https://stackoverflow.com/questions/8804830/python-multiprocessing-picklingerror-cant-pickle-type-function
github https://github.com/uqfoundation/multiprocess

"""
# School 类负责管理学生
class School:
    def __init__(self, num_students, cookies, url, hook_script, myarg):
        self.students = []
        for _ in range(num_students):
            self.students.append(Student(cookies, url, "com.fenbi.android.leo", hook_script, myarg))

    def get_student(self, idx):
        return self.students[idx]

# 教师类, 管理学生开始答题, 一个老师管一个学生
# class Teacher:
#     def __init__(self, num_students, cookies, url, hook_script, myarg):
#         self.num_students = num_students
#         self.cookies = cookies
#         self.url = url
#         self.hook_script = hook_script
#         self.myarg = myarg
#
#     def create_student(self, idx):
#         """在子进程中创建并返回 Student 对象"""
#         print(f"Creating student {idx}")
#         return Student(self.cookies, self.url, "com.fenbi.android.leo", self.hook_script, self.myarg)


# 创建一个学校，存放所有Teacher, 所有new Teacher都在学校里, Teacher数量和Student和进程(做题考试)数量相等且运行时一一对应,每个Teacher给每个Student一人一套题
school = [Student(cookies, url, "com.fenbi.android.leo", hook_script, myarg), Student(cookies, url, "com.fenbi.android.leo", hook_script, myarg), Student(cookies, url, "com.fenbi.android.leo", hook_script, myarg)]


# 封装执行逻辑的函数
def execute_student_task(my_school, idx):
    # 不要使用global, 多进程里看不到global全局变量
    # global school
    try:
        print(my_school)
        print(f"选中学生 {idx}")
        student = my_school
        # student = my_school.get_student(idx)
        print(f"Student fetched: {student}")
        student.answer()
    except Exception as e:
        print(f"Error occurred: {e}")


# 创建进程池，每个进程池不断执行任务
def run_student_tasks(timeout=5):
    global set_processes
    global school
    num_processes = set_processes
    print("当前设置的全局进程数量: ", num_processes)

    with Pool(num_processes) as pool:
        while True:
            # 提交任务到进程池中，每个任务传递学生索引 idx
            futures = pool.amap(execute_student_task, range(num_processes))

            # 等待一段时间，查看是否有任务完成
            time.sleep(timeout)

            # 检查任务完成情况
            if futures.ready():
                try:
                    futures.get()  # 获取任务结果
                except Exception as e:
                    print(f"Task failed with error: {e}")

            else:
                print(f"Tasks not yet completed after {timeout} seconds.")


def hook_cookie():
    print("通过hook拿cookie和请求url参数方法暂不可用, 请手动填写cookie和url")
    exit(1)


def main():
    global set_processes
    global myarg
    global school

    parser = argparse.ArgumentParser()
    parser.add_argument('--hookcookie', action='store_true', help='Run hookcookie method if specified')
    parser.add_argument('--fakeq', action='store', type=int, default=1, help='设置答案倍数,超过3不记成绩')
    parser.add_argument("--processes", action='store', type=int, default=20, help="设置进程数量,太高会卡,默认20")

    args = parser.parse_args()

    if args.hookcookie:
        hook_cookie()

    if args.fakeq:
        myarg["q_magn"] = args.fakeq
        print("已设置试题倍数: ", myarg["q_magn"])

    if args.processes:
        set_processes = args.processes
        print("已设置进程数量: ", set_processes)

    # school = School(set_processes, cookies, url, hook_script, myarg)
    # 测试初始化school
    print("School initialized:", school)
    run_student_tasks()


if __name__ == "__main__":
    main()
