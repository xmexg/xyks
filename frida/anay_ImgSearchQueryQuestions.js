/**
 * hook不到, 看来没走这里
 * 
 * ie.b.c()
 * jadx反编译
 * public final List<com.fenbi.android.leo.imgsearch.sdk.data.b> c(List<? extends ByteString> questions) {
        int z11;
        int z12;
        if (questions != null) {
            List<? extends ByteString> list = questions;
            int i11 = 10;
            z11 = u.z(list, 10);
            ArrayList arrayList = new ArrayList(z11);
            Iterator it = list.iterator();
            while (it.hasNext()) {
                ImgSearchQueryQuestions.QuestionVO parseFrom = ImgSearchQueryQuestions.QuestionVO.parseFrom(i.f31342a.a(((ByteString) it.next()).toByteArray()));
                String answer = parseFrom.getAnswer();
                String content = parseFrom.getContent();
                String solution = parseFrom.getSolution();
                String token = parseFrom.getToken();
                int source = parseFrom.getSource();
                int inErrorBook = parseFrom.getInErrorBook();
                long updatedTime = parseFrom.getUpdatedTime();
                int diversion = parseFrom.getDiversion();
                String diversionUrl = parseFrom.getDiversionUrl();
                boolean aiQaShow = parseFrom.getAiQaShow();
                String extra = parseFrom.getExtra();
                List<ImgSearchQueryQuestions.TypeContent> stepSolutionList = parseFrom.getStepSolutionList();
                y.f(stepSolutionList, "getStepSolutionList(...)");
                List<ImgSearchQueryQuestions.TypeContent> list2 = stepSolutionList;
                z12 = u.z(list2, i11);
                ArrayList arrayList2 = new ArrayList(z12);
                Iterator it2 = list2.iterator();
                while (it2.hasNext()) {
                    ImgSearchQueryQuestions.TypeContent typeContent = (ImgSearchQueryQuestions.TypeContent) it2.next();
                    Iterator it3 = it;
                    String content2 = typeContent.getContent();
                    y.f(content2, "getContent(...)");
                    arrayList2.add(new l0(content2, typeContent.getType()));
                    it2 = it2;
                    it = it3;
                }
                arrayList.add(new com.fenbi.android.leo.imgsearch.sdk.data.b(aiQaShow, answer, content, diversion, diversionUrl, inErrorBook, solution, source, token, arrayList2, updatedTime, 0, extra, 2048, null));
                it = it;
                i11 = 10;
            }
            ArrayList arrayList3 = new ArrayList();
            for (Object obj : arrayList) {
                if (((com.fenbi.android.leo.imgsearch.sdk.data.b) obj).isValid()) {
                    arrayList3.add(obj);
                }
            }
            return arrayList3;
        }
        return null;
    }
 */
Java.perform(function() {
    let QuestionVO = Java.use("com.yuanfudao.android.leo.relative.protobuf.ImgSearchQueryQuestions$QuestionVO");
    QuestionVO["parseFrom"].overload('[B').implementation = function (bArr) {
        console.log(`QuestionVO.parseFrom is called: bArr=${bArr}`);
        let result = this["parseFrom"](bArr);
        console.log(`QuestionVO.parseFrom result=${result}`);
        return result;
    }
})