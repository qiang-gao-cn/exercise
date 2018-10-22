
/* Function: HLS Download Program
 * Author: harry.ma@dao-lab.com
 * Description: Simple M3U8 Download Tool
 */

#include <cstdio>
#include <iostream>
#include <fstream>
#include <unistd.h>
#include <sys/stat.h>
#include <string.h>
#include "picojson.h"

using namespace std;

static int ImGood = 1;

int download(string path);
int parseM3U8(string fname, string path);

int parseM3U8(string fname, string path) {
  // 解析路径
  string fext = fname.substr(fname.find_last_of(".") + 1);
  string dname = path.substr(0, path.find_last_of("/\\"));
   // 判断路径是否存在并且结尾为m3u8
  if (access(fname.c_str(), R_OK) == 0 && fext == "m3u8") {
    ifstream f(fname.c_str());
    if (f.is_open()) {
      string line;
      // 遍历路径m3u8文件中的每一行
      // TODO：添加判断内容，进行进一步判断
      while (getline(f, line)) {
        if (line.find("#") != 0) {
          if (line.find("://") == std::string::npos) {
            line = dname + "/" + line;
          }
          download(line);
        }
      }
      f.close();
    }
  }

  return 0;
}
// 根据得到的路径开始进行下载
int download(string path) {
  // 解析路径的地址
  // find返回的是位置的数值
  string fname = path.substr(0, path.find("?", 0));
  fname = fname.substr(fname.find_last_of("/\\") + 1);
  string fext = fname.substr(fname.find_last_of(".") + 1);
  // 使用curl编辑下载命令 note：fail timeout等时间
  // TODO进行timeout等时间的测试
  string cmd = "curl ";
  cmd += " --fail --insecure --location --stderr /dev/null ";
  cmd += " --connect-timeout 5 ";
  cmd += " --max-time 10 ";
  cmd += " --retry 5 ";
  cmd += " --retry-delay 0 ";
  cmd += " --retry-max-time 60 ";
  cmd += " --output " + fname + " ";
  cmd += path;
  // 判断路径的结尾是否为m3u8 以及路径是否存在
  if (fext == "m3u8" || access(fname.c_str(), R_OK) != 0) {
    int r = system(cmd.c_str());
    if (r == 0) {
      // 回调函数
      parseM3U8(fname, path);
    }
  }

  return 0;
}
// 加载json文件中的src并进判断，开始执行下载函数
string loadUrl(const char* path) {

  ifstream cfg(path);
  string src = "";
  // 判断配置函数是否可以打开
  // TODO判断打不开，添加else
  if (cfg.is_open()) {
    // pciojson.h解析配置文件
    picojson::value v;
    string err = picojson::parse(v, cfg);
    // 判断配置文件是否为空
    //TODO判断配置文件是否是json格式
    if (err.empty()) {
      src = v.get("Src").to_str();
      // 根据获取配置文件中的src值（字符串）为参数，执行下载函数
      download(src);
    }
    cfg.close();
  } else {
    // note：ImGood的值的变化0 1 -1是true还是false
    ImGood = 0;
  }

  return src;
}
// 主函数 argc 参数个数  argv 参数
// TODO:添加配置文件的判断 张晓娇配置文件代码
int main(int argc, char** argv) {
  // access 判断文件是否存在 0存在-1不存在
  if (argc == 2 && access(argv[1], R_OK) == 0) {
    // while持续判断 并执行加载url函数
    // TODO：添加跳出
    while (ImGood) {
      loadUrl(argv[1]);
      // usleep微妙
      // note：注意运行loadUrl时间，防止漏掉ts
      usleep(500000);
    }
  }
 // return 0 返回值需要特别注意
  return 0;
}
