/**
 * hook 不到, 看来没走这里
 * 
 * package com.fenbi.android.leo.imgsearch.sdk.network;
 * 
 * jadx反编译
 *  public final class e extends Converter.Factory {
        public static final Object b(Annotation[] annotations, Converter converter, ResponseBody responseBody) {
            y.g(annotations, "$annotations");
            boolean z11 = false;
            for (Annotation annotation : annotations) {
                if (SearchNeedDecode.class.isInstance(annotation)) {
                    z11 = true;
                }
            }
            if (z11) {
                byte[] a11 = i.f31342a.a(responseBody.bytes());
                ResponseBody.Companion companion = ResponseBody.INSTANCE;
                MediaType mediaType = responseBody.get$contentType();
                y.d(a11);
                return converter.convert(companion.create(mediaType, a11));
            }
            return converter.convert(responseBody);
        }

        @Override // retrofit2.Converter.Factory
        @NotNull
        public Converter<ResponseBody, ?> responseBodyConverter(@NotNull Type type, @NotNull final Annotation[] annotations, @NotNull Retrofit retrofit) {
            y.g(type, "type");
            y.g(annotations, "annotations");
            y.g(retrofit, "retrofit");
            final Converter nextResponseBodyConverter = retrofit.nextResponseBodyConverter(this, type, annotations);
            return new Converter() { // from class: com.fenbi.android.leo.imgsearch.sdk.network.d
                @Override // retrofit2.Converter
                public final Object convert(Object obj) {
                    Object b11;
                    b11 = e.b(annotations, nextResponseBodyConverter, (ResponseBody) obj);
                    return b11;
                }
            };
        }
    }
 */

Java.perform(function() {
    let e = Java.use("com.fenbi.android.leo.imgsearch.sdk.network.e");
    e["b"].implementation = function (annotations, converter, responseBody) {
        console.log(`e.b is called: annotations=${annotations}, converter=${converter}, responseBody=${responseBody}`);
        let result = this["b"](annotations, converter, responseBody);
        console.log(`e.b result=${result}`);
        return result;
    }
})